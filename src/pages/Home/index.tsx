import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  X,
  ArrowRight, GraduationCap, MapPin
} from 'lucide-react';
import { BLOG_POSTS } from '../../data/blog';
import { QuickAdmissionDrawer } from '../../components/common/QuickAdmissionDrawer';
import Faq05 from '@/components/ui/faq-05';
import MarqueeAlongSvgPathDemo from '@/components/ui/marquee-demo';
import { HorizontalPanelGallery } from '../../components/home/HorizontalPanelGallery';
import { NoticeEventBoard } from '../../components/home/NoticeEventBoard';
import { ScrollExpandingMosaic } from '../../components/home/ScrollExpandingMosaic';

import { ChinmayaVisionPillarsShowcase } from '../../components/home/ChinmayaVisionPillarsShowcase';
import { HeroBannerSection } from '../../components/home/HeroBannerSection';
import { MobileHeroSection } from '../../components/home/MobileHeroSection';
import { MissionVisionBulletinSection } from '../../components/home/MissionVisionBulletinSection';
import { BannerCarousel } from '../../components/home/BannerCarousel';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

gsap.registerPlugin(ScrollTrigger);

const GUIDING_QUOTES = [
  {
    id: 'swami-1',
    quote: '"Children are not vessels to be filled, but lamps to be lit. When you ignite the noble flame within a child, you illuminate generations."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/quotes/swami_quote_1.webp',
    label: 'VISION OF PUJYA GURUDEV',
  },
  {
    id: 'swami-2',
    quote: '"Happiness depends on what you can give, not on what you can get."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/quotes/swami_quote_2.webp',
    label: 'ON HAPPINESS',
  },
  {
    id: 'swami-3',
    quote: '"Stand up, be bold, be strong. Take the whole responsibility on your own shoulders, and know that you are the creator of your own destiny."',
    author: 'Pujya Gurudev Swami Chinmayananda',
    role: 'Founder of Chinmaya Mission',
    image: '/images/quotes/swami_quote_3.webp',
    label: 'ON COURAGE & CHARACTER',
  },
];

const SHUFFLED_QUOTES = GUIDING_QUOTES;

export const HomePage: React.FC = () => {
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [isAdmissionDrawerOpen, setIsAdmissionDrawerOpen] = useState<boolean>(false);
  const [activeQuote, setActiveQuote] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Lock body/Lenis scrolling when enlarged gallery image is active
  useBodyScrollLock(!!selectedGalleryImg);

  // GSAP Animation References
  const homeWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Master Timeline & ScrollTrigger choreographies
    const ctx = gsap.context(() => {
      // Scroll reveals for architectural sections
      gsap.utils.toArray<HTMLElement>('.editorial-reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, homeWrapperRef);

    return () => ctx.revert();
  }, []);

  // Guiding Voices Carousel auto-rotation with no-repeat
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);
  useEffect(() => {
    if (isQuoteHovered) return;
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % SHUFFLED_QUOTES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isQuoteHovered]);



  const currentQuote = SHUFFLED_QUOTES[activeQuote];

  return (
    <div ref={homeWrapperRef} className="bg-white text-[#181C20] overflow-x-clip selection:bg-[#DF711B] selection:text-white font-sans">
      
      {/* ----------------------------------------------------
          SECTION 01 - HERO SECTION
          DESKTOP: BANNER + VISION/MISSION/EVENTS BULLETIN
          MOBILE: MOBILE HERO SHOWCASE (BEFORE WE VALUE)
         ---------------------------------------------------- */}
      {isDesktop ? (
        <>
          <HeroBannerSection />
          <MissionVisionBulletinSection />
        </>
      ) : (
        <MobileHeroSection onOpenAdmissions={() => setIsAdmissionDrawerOpen(true)} />
      )}

      {/* ----------------------------------------------------
          SECTION 02 - SCROLL-JACKED HORIZONTAL PANEL GALLERY
          Panel A: "WE VALUE" 4-Column Grid
          Panel B: "PALGHAR DISTRICT'S BEST CBSE SCHOOL" Studio Cutout
          Panel C: Campus Architectural Gallery Preview
         ---------------------------------------------------- */}
      <HorizontalPanelGallery />

      {/* ----------------------------------------------------
          SECTION 2.5 - BANNER CAROUSEL (1.jpeg & 2.jpeg)
         ---------------------------------------------------- */}
      <BannerCarousel />

      {/* ----------------------------------------------------
          SECTION 2.6 - BANNER 2
         ---------------------------------------------------- */}
      <section className="w-full bg-white relative overflow-hidden" aria-label="Chinmaya Vidyalaya Tarapur Banner 2">
        <picture>
          <source srcSet="/banner-2.webp?v=1" type="image/webp" />
          <img 
            src="/banner-2.png?v=1" 
            alt="Chinmaya Vidyalaya Tarapur Promotional Banner" 
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain block"
          />
        </picture>
      </section>

      {/* ----------------------------------------------------
          CAMPUS LIFE PHOTOGRAPHIC MARQUEE STREAM
         ---------------------------------------------------- */}
      <div className="hidden md:block">
        <MarqueeAlongSvgPathDemo />
      </div>

      {/* ----------------------------------------------------
          SECTION 04 - FOUNDATIONAL MATRIX: CHINMAYA VISION PROGRAM (CVP)
         ---------------------------------------------------- */}
      <ChinmayaVisionPillarsShowcase />

      {/* ----------------------------------------------------
          SECTION 05 - EXPLORE OUR LABORATORIES & SANCTUARIES
         ---------------------------------------------------- */}
      <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          {/* Centered Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
              CAMPUS INFRASTRUCTURE • LEARNING SANCTUARIES
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-black text-[#181818] tracking-tight uppercase leading-none m-0">
              EXPLORE OUR LABORATORIES
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#555555] max-w-2xl mx-auto leading-relaxed m-0 pt-1">
              CBSE-compliant science laboratories, computer innovation centers, and scholastic resources designed for hands-on discovery, critical inquiry, and academic distinction.
            </p>
          </div>

          {/* 2x2 Verified Chinmaya Vidyalaya Laboratories Grid (Clickable to Infrastructure Page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                id: 'lab-physics',
                targetId: 'physics-lab',
                title: 'Physics Lab',
                image: '/images/sections/laboratories/physics-lab.jpg',
                fallback: '/images/pages/home/laboratories/physics-lab.jpg',
                tagline: 'CBSE Senior Secondary Optics, Mechanics & Circuits',
                to: '/academics/infrastructure#physics-lab',
              },
              {
                id: 'lab-chemistry',
                targetId: 'chemistry-lab',
                title: 'Chemistry Lab',
                image: '/images/chinmaya/cultural/cultural_celebration_016.jpg',
                fallback: '/images/sections/laboratories/chemistry-lab.jpg',
                tagline: 'Analytical Titration, Reagents & Fume Hoods',
                to: '/academics/infrastructure#chemistry-lab',
              },
              {
                id: 'lab-biology',
                targetId: 'biology-lab',
                title: 'Biology Lab',
                image: '/images/chinmaya/academics/classroom_learning_018.jpg',
                fallback: '/images/sections/laboratories/biology-lab.jpg',
                tagline: 'Compound Microscopes, Specimen Archives & Histology',
                to: '/academics/infrastructure#biology-lab',
              },
              {
                id: 'lab-it',
                targetId: 'it-lab',
                title: 'IT Lab',
                image: '/images/sections/laboratories/it-lab.jpg',
                fallback: '/images/pages/home/laboratories/it-lab.jpg',
                tagline: 'Networked Workstations, Scratch, Python & Cyber Labs',
                to: '/academics/infrastructure#it-lab',
              },
            ].map((card) => (
              <Link
                key={card.id}
                to={card.to}
                className="rounded-[1.75rem] border-[3.5px] border-[#DF711B] bg-[#DF711B] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer transform hover:-translate-y-1"
                title={`Explore ${card.title} Infrastructure and Apparatus`}
              >
                {/* Lab Image */}
                <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (card.fallback && !target.src.includes(card.fallback)) {
                        target.src = card.fallback;
                      }
                    }}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom Solid Terracotta Banner with title & arrow */}
                <div className="bg-[#DF711B] text-white py-3.5 sm:py-4 px-6 relative flex items-center justify-between">
                  <div>
                    <p className="font-sans font-black text-sm sm:text-base text-white uppercase tracking-wider m-0 leading-tight">
                      {card.title}
                    </p>
                    <p className="font-sans text-[11px] text-amber-100/90 font-medium m-0 mt-0.5">
                      {card.tagline}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#DF711B] flex items-center justify-center transition-colors shrink-0 shadow-xs">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer Action */}
          <div className="text-center pt-2">
            <Link
              to="/academics/infrastructure"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#181818] hover:bg-[#DF711B] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm rounded-full"
            >
              <span>Explore All Labs & Campus Grounds</span>
              <span className="text-[#FFB740] font-bold text-sm">›</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 05.5 - LIVE NOTICE & EVENT BOARD
         ---------------------------------------------------- */}
      <NoticeEventBoard />

      {/* ----------------------------------------------------
          SECTION 05.6 - SCROLL-EXPANDING MEDIA MOSAIC
         ---------------------------------------------------- */}
      <ScrollExpandingMosaic />

      {/* ----------------------------------------------------
          SECTION 05.65 - SIGN BANNER
         ---------------------------------------------------- */}
      <section className="w-full bg-white relative overflow-hidden" aria-label="Campus Sign Banner">
        <img 
          src="/images/sign.webp" 
          alt="Chinmaya Vidyalaya Campus Banner" 
          className="w-full h-auto object-cover block"
          loading="lazy"
          decoding="async"
        />
      </section>



      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedGalleryImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#181C20]/95 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain select-none"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onClick={() => setSelectedGalleryImg(null)}
          >
            <button 
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedGalleryImg} 
              alt="Enlarged Campus Visual" 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-white/20 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------
          SECTION 07.5 - GUIDING VOICES CAROUSEL
         ---------------------------------------------------- */}
      <section className="py-6 sm:py-8 bg-white relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

          <div 
            className="relative"
            onMouseEnter={() => setIsQuoteHovered(true)}
            onMouseLeave={() => setIsQuoteHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="bg-white text-[#181C20] p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6 lg:gap-10"
              >
                {/* Author Image - upright with zero cut issues */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg overflow-hidden border-2 border-[#DF711B]/40 shadow-md shrink-0 bg-white p-1 flex items-center justify-center">
                  <img
                    key={currentQuote.image}
                    src={currentQuote.image}
                    alt={currentQuote.author}
                    className="w-full h-full object-cover object-center rounded-md"
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.jpg');
                      }
                    }}
                  />
                </div>

                {/* Quote Content */}
                <div className="space-y-4 text-center md:text-left flex-1">
                  <span className="inline-block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold bg-amber-50 border border-amber-200/60 px-3 py-1">
                    {currentQuote.label}
                  </span>

                  <blockquote className="font-display text-[18px] sm:text-[22px] lg:text-[26px] font-black text-[#181818] uppercase tracking-tight leading-snug m-0">
                    {currentQuote.quote}
                  </blockquote>

                  <div className="space-y-0.5">
                    <p className="text-sm sm:text-base text-[#181818] font-bold font-mono m-0">
 - {currentQuote.author}
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#777777] font-normal uppercase tracking-wider font-mono m-0">
                      {currentQuote.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center justify-center gap-3">
            {SHUFFLED_QUOTES.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setActiveQuote(i)}
                className={`transition-all duration-300 ${
                  i === activeQuote
                    ? 'w-8 h-2 bg-[#DF711B] rounded-full'
                    : 'w-2 h-2 bg-[#D5CEC2] rounded-full hover:bg-[#DF711B]/50'
                }`}
                aria-label={`View quote ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 07.8 - FROM OUR BLOG & EDUCATIONAL INSIGHTS
         ---------------------------------------------------- */}
      {BLOG_POSTS.length > 0 && (
        <section className="py-12 sm:py-16 bg-white relative overflow-hidden border-t border-slate-200">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold">
                  THOUGHT LEADERSHIP • EDUCATIONAL PERSPECTIVES
                </span>
                <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[40px] font-black text-[#181818] tracking-tight leading-none uppercase m-0">
                  FROM OUR SCHOOL BLOG & INSIGHTS
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#181818] hover:bg-[#DF711B] text-[#FFFFFF] font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors select-none shrink-0"
              >
                <span className="text-[#FFB740] font-bold text-xs">›</span>
                <span>EXPLORE ALL ARTICLES</span>
              </Link>
            </div>

            {/* 3 Featured Blog Articles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  to={`/blog?post=${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#DF711B]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2.5 right-3.5 text-[10.5px] font-mono text-slate-200">
                      <span>{post.publishDate}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="font-cinzel text-base font-bold text-[#0B1E34] group-hover:text-[#DF711B] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover border border-[#DF711B]/40 shrink-0"
                        />
                        <span className="text-[11px] font-bold text-[#0C1E34] truncate">
                          {post.author.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#DF711B] group-hover:translate-x-1 transition-transform flex items-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Frequently Asked Questions Section on Home */}
      <Faq05 />



      {/* ----------------------------------------------------
          SECTION 08 - MASTER FINAL CONVERSION BANNER (ADMISSIONS)
         ---------------------------------------------------- */}
      <section className="py-14 sm:py-20 md:py-28 bg-gradient-to-br from-[#0B1D30] via-[#122842] to-[#0B1D30] text-white relative overflow-hidden shadow-2xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5 sm:space-y-7 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-[#FFB740]/15 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FFB740] uppercase font-bold border border-[#FFB740]/35 rounded-full">
            <GraduationCap className="w-4 h-4" />
            <span>SESSION 2027-28 ADMISSIONS OPEN (NURSERY TO CLASS 11)</span>
          </div>

          <h2 className="font-cinzel text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] uppercase">
            SHAPE YOUR FUTURE WITH <br className="hidden sm:inline" />
            <span className="text-[#FFB740]">WISDOM AND DISTINCTION</span>
          </h2>

          <p className="text-xs sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Join the Chinmaya Vidyalaya family in Boisar / Tarapur. Download application forms, schedule a campus visit, or connect with our academic admissions office today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-2 w-full max-w-lg mx-auto sm:max-w-none">
            <button
              type="button"
              onClick={() => setIsAdmissionDrawerOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FFB740] hover:bg-[#FFC769] text-[#0B1D30] font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
            >
              <span className="text-[#0B1D30] font-bold text-sm">›</span>
              <span>APPLY ONLINE & DOWNLOAD FORMS</span>
            </button>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              <span className="text-[#FFB740] font-bold text-sm">›</span>
              <span>CONTACT CAMPUS OFFICE</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FFB740]" />
              P-201 MIDC Area, Boisar 401501
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Tel: 9322054713</span>
            <span className="hidden sm:inline">•</span>
            <span>cv.info@chinmayamission.com</span>
          </div>
        </div>
      </section>



      {/* Quick Admission Drawer */}
      <QuickAdmissionDrawer
        isOpen={isAdmissionDrawerOpen}
        onClose={() => setIsAdmissionDrawerOpen(false)}
      />

    </div>
  );
};


