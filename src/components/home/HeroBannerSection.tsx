import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Send, Loader2 } from 'lucide-react';
import { formService } from '../../services/formService';
import { useToast } from '../../context/ToastContext';

interface HeroSlide {
  id: string;
  image: string;
  fallback: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'campus-front',
    image: '/images/hero-campus-front.webp',
    fallback: '/images/hero-campus-front.png',
    alt: 'Chinmaya Vidyalaya Tarapur Campus Front Facade',
  },
  {
    id: 'courtyard',
    image: '/images/hero-courtyard.webp',
    fallback: '/images/hero-courtyard.png',
    alt: 'Chinmaya Vidyalaya Tarapur Courtyard and Shrine',
  },
  {
    id: 'aerial',
    image: '/images/hero-aerial.webp',
    fallback: '/images/hero-aerial.jpg',
    alt: 'Chinmaya Vidyalaya Tarapur Aerial Campus View',
  },
];

const GRADE_OPTIONS = [
  'Nursery',
  'Jr. KG',
  'Sr. KG',
  'Std I',
  'Std II',
  'Std III',
  'Std IV',
  'Std V',
  'Std VI',
  'Std VII',
  'Std VIII',
  'Std IX',
  'Std X',
  'Std XI (Science)',
  'Std XI (Commerce)',
  'Std XI (Arts)',
];

export const HeroBannerSection: React.FC = () => {
  const { showSuccess, showToast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Admissions Form State
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const diff = touchStartXRef.current - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pName = parentName.trim();
    const sName = studentName.trim();
    const cleanedPhone = phone.trim();

    if (!pName || !sName || !cleanedPhone || !grade) {
      showToast({ type: 'error', title: 'Missing Fields', message: 'Please fill in all required fields marked with *.' });
      return;
    }

    const namePattern = /^[a-zA-Z\s.'-]{2,80}$/;
    if (!namePattern.test(pName) || !namePattern.test(sName)) {
      showToast({ type: 'error', title: 'Invalid Name', message: 'Parent and Child names must contain only letters (at least 2 characters).' });
      return;
    }

    if (!/^[0-9]{10}$/.test(cleanedPhone)) {
      showToast({ type: 'error', title: 'Invalid Mobile Number', message: 'Please enter a valid 10-digit mobile number.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await formService.submitAdmission({
        parentName: pName,
        studentName: sName,
        phone: cleanedPhone,
        email: email.trim() || undefined,
        gradeApplyingFor: grade,
      });

      if (result.success) {
        setSubmitted(true);
        showSuccess('Enquiry Submitted', 'Our Admissions Desk will contact you shortly.');
        setParentName('');
        setStudentName('');
        setPhone('');
        setEmail('');
        setGrade('');
      } else {
        showToast({ type: 'error', title: 'Submission Failed', message: result.message || 'Unable to submit enquiry. Please try again.' });
      }
    } catch {
      showToast({ type: 'error', title: 'Network Error', message: 'Network error while submitting enquiry. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative w-full bg-[#121518] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Chinmaya Vidyalaya Tarapur Hero Banner and Admissions Enquiry"
    >
      {/* Background Slides */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                if (slide.fallback && !target.src.includes(slide.fallback)) {
                  target.src = slide.fallback;
                }
              }}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        {/* Subtle bottom gradient so pagination dots remain clear */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Banner Height Container (keeps 1910x606 desktop proportion) */}
      <div className="relative z-10 w-full min-h-[400px] lg:aspect-[1910/606] pointer-events-none" />

      {/* Right-Edge Sticky Admissions Box (Expands to Form on Hover) */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex items-center"
        onMouseEnter={() => setIsFormOpen(true)}
        onMouseLeave={() => setIsFormOpen(false)}
        onFocus={() => setIsFormOpen(true)}
      >
        {!isFormOpen ? (
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            aria-label="Admissions Open for 2027-28 - Hover or click to open enquiry form"
            className="bg-[#DF711B] hover:bg-[#c55e11] text-white px-2.5 py-4 rounded-l-lg rounded-r-none shadow-2xl border-y border-l border-white/25 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span
              style={{ writingMode: 'vertical-rl' }}
              className="rotate-180 font-display font-extrabold text-xs sm:text-sm tracking-wider whitespace-nowrap"
            >
              Admission Open for 2027-28
            </span>
          </button>
        ) : (
          <div className="w-[calc(100vw-24px)] max-w-[400px] lg:w-[400px] xl:w-[420px] bg-white/95 backdrop-blur-md rounded-l-2xl rounded-r-none shadow-2xl border-y border-l border-white/60 p-4 sm:p-5 text-[#181C20]">
            {/* Card Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-200">
              <h2 className="font-display font-extrabold text-base sm:text-lg text-[#181C20] m-0">
                Admissions Open for
              </h2>
              <span className="px-2.5 py-1 rounded-lg bg-[#FFF4E5] border border-[#DF711B]/30 text-[#DF711B] font-mono font-bold text-xs">
                2027-2028
              </span>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#181C20] m-0">
                  Enquiry Received!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 m-0">
                  Thank you for contacting Chinmaya Vidyalaya Tarapur. Our Admissions Coordinator will reach out to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#DF711B] hover:underline cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="hero-parent-name" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Parent Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="hero-parent-name"
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Parent Name"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-child-name" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Child Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="hero-child-name"
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Child Name"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="hero-mobile" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Mobile No. <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden focus-within:border-[#DF711B] focus-within:ring-1 focus-within:ring-[#DF711B]">
                      <span className="px-2 py-2 text-xs font-mono font-bold text-slate-500 bg-slate-50 border-r border-slate-200 select-none">
                        +91
                      </span>
                      <input
                        id="hero-mobile"
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit Mobile"
                        className="w-full px-2.5 py-2 text-xs sm:text-sm bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="hero-email" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      id="hero-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="hero-grade" className="block text-[11px] font-bold text-slate-700 mb-1">
                    Select Grade <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="hero-grade"
                    required
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#DF711B] focus:ring-1 focus:ring-[#DF711B] transition-colors text-slate-700"
                  >
                    <option value="">Choose Grade Applying For</option>
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-1 py-2.5 px-4 rounded-lg bg-[#DF711B] hover:bg-[#c55e11] disabled:opacity-60 text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Carousel Controls: Prev/Next Arrows & Bottom Pagination Dots (only when multiple slides) */}
      {HERO_SLIDES.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-4 bottom-3 z-20 w-9 h-9 rounded-full bg-black/45 hover:bg-[#DF711B] text-white items-center justify-center border border-white/20 backdrop-blur-sm transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-4 bottom-3 z-20 w-9 h-9 rounded-full bg-black/45 hover:bg-[#DF711B] text-white items-center justify-center border border-white/20 backdrop-blur-sm transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide
                    ? 'w-7 bg-[#DF711B]'
                    : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
