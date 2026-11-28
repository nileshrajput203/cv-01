import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PillarData {
  num: string;
  tabLabel: string;
  pillarTitle: string;
  shortTitle: string;
  subtitleTag: string;
  sanskrit: string;
  image: string;
  isCutout?: boolean;
  visionStatement: string;
  explanation: string;
  targetUrl: string;
  keyPoints: string[];
}

const CVP_PILLARS: PillarData[] = [
  {
    num: '01',
    tabLabel: 'Integrated',
    shortTitle: 'Integrated Development',
    pillarTitle: 'PILLAR 1: INTEGRATED DEVELOPMENT',
    subtitleTag: 'Physical, Mental, Intellectual & Spiritual Development',
    sanskrit: 'Sharirik, Manasik, Bauddhik & Adhyatmik Vikas',
    image: '/images/pages/home/pillars/pillar-01-integrated.jpg',
    isCutout: false,
    visionStatement:
      'True education nurtures the entire being - harmonizing physical vitality, an analytical intellect, and emotional equilibrium to build purposeful leaders.',
    explanation:
      'The first pillar of the Chinmaya Vision Programme harmonizes the multidimensional growth of every child. Through morning yoga, sports, experiential science labs, and mindful self-reflection, students cultivate physical vigor, critical thinking, and inner poise.',
    targetUrl: '/about/philosophy#pillar-01',
    keyPoints: [
      'Physical Development (Sharirik): Sports, physical fitness, yoga & athletics',
      'Mental Development (Manasik): Emotional balance, resilience, focus & Gita chanting',
      'Intellectual Development (Bauddhik): AI, Coding, science labs & critical logic',
      'Spiritual Development (Adhyatmik): Ethical values, mutual respect & character building'
    ]
  },
  {
    num: '02',
    tabLabel: 'Culture',
    shortTitle: 'Indian Culture',
    pillarTitle: 'INDIAN CULTURE & TIMELESS VALUES',
    subtitleTag: 'Heritage, Ethics & Living Wisdom',
    sanskrit: 'Bhartiya Sanskriti & Parampara',
    image: '/images/pages/home/pillars/pillar-02-culture.webp',
    isCutout: false,
    visionStatement:
      'Rooted in ancient wisdom, our heritage is a living moral compass - instilling reverence, cultural pride, and righteous character in every young mind.',
    explanation:
      'The second pillar anchors students in India’s timeless cultural ethos. Through daily morning prayers, Sanskrit chanting, value-based discussions, and celebrations of traditional festivals, students develop deep respect for elders, humility, and unshakeable ethical grounding.',
    targetUrl: '/about/philosophy#pillar-02',
    keyPoints: [
      'Daily morning prayer assembly, shloka chanting & value education',
      'Annual Bhagavad Gita chanting competitions & cultural forums',
      'Matru-Pitru Pujan & celebrations of sacred Indian festivals',
      'Appreciation of classical Indian music, art, and Sanskrit heritage'
    ]
  },
  {
    num: '03',
    tabLabel: 'Patriotism',
    shortTitle: 'Patriotism',
    pillarTitle: 'PILLAR 3: PATRIOTISM & CIVIC DUTY',
    subtitleTag: 'Civic Duty as an Active Expression of Patriotism',
    sanskrit: 'Rashtra Prem & Nagarik Kartavya',
    image: '/images/pages/home/pillars/pillar-03-patriotism.jpg',
    isCutout: false,
    visionStatement:
      'True patriotism is translated into dedicated action through civic duty, active community seva, and selfless service to the motherland.',
    explanation:
      'The third pillar nurtures deep patriotism, where civic duty and active citizenship are an integral part of national dedication. Through local Swachhata drives, environmental initiatives, and community service across Boisar, students learn that genuine patriotism begins with responsible civic action.',
    targetUrl: '/about/philosophy#pillar-03',
    keyPoints: [
      'Democratic Student Council elections & youth leadership governance',
      'Kargil Vijay Diwas commemorations & Armed Forces tributes',
      'Maharashtra Divas celebrations & cultural state pride',
      'Nasha Mukt Bharat youth rallies & Swachhata cleanliness drives'
    ]
  },
  {
    num: '04',
    tabLabel: 'Universal',
    shortTitle: 'Universal Outlook',
    pillarTitle: 'UNIVERSAL OUTLOOK & GLOBAL PERSPECTIVE',
    subtitleTag: 'Vasudhaiva Kutumbakam • One World Family',
    sanskrit: 'Vasudhaiva Kutumbakam',
    image: '/images/pages/home/pillars/pillar-04-universal.webp',
    isCutout: false,
    visionStatement:
      'Vasudhaiva Kutumbakam - the whole world is one family. Education must transcend narrow boundaries to foster universal brotherhood and planetary empathy.',
    explanation:
      'The fourth pillar broadens student awareness beyond geographic and cultural borders. By combining rigorous CBSE curricula with a universal Vedantic outlook, students learn to appreciate global cultures, champion environmental sustainability, and lead with empathy.',
    targetUrl: '/about/philosophy#pillar-04',
    keyPoints: [
      'Universal prayer framework honoring global peace & goodwill',
      'Globally benchmarked CBSE academic standards & critical thinking',
      'Planetary ecological stewardship & sustainable green practices',
      'Cosmopolitan perspective, ethical leadership & cultural appreciation'
    ]
  }
];

export const ChinmayaVisionPillarsShowcase: React.FC = () => {
  return (
    <section
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] border-t-2 border-[#DF711B] overflow-hidden select-none"
      aria-label="Chinmaya Vision Program"
    >
      {/* Subtle soft ambient glow matching reference backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(223,113,27,0.08),transparent_45%),radial-gradient(circle_at_85%_70%,rgba(11,29,48,0.05),transparent_45%)]"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-slate-300" />
            <picture className="inline-flex items-center justify-center">
              <source srcSet="/images/flame-emblem.webp" type="image/webp" />
              <img
                src="/images/flame-emblem.png"
                alt="Chinmaya Flame Emblem"
                loading="lazy"
                decoding="async"
                className="h-12 sm:h-14 w-auto object-contain select-none"
              />
            </picture>
            <span className="w-8 h-[1px] bg-slate-300" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#181C20] tracking-tight m-0">
            Chinmaya Vision Program
          </h2>
        </div>

        {/* 4-Column Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CVP_PILLARS.map((pillar, idx) => (
            <Link
              key={pillar.num}
              to={pillar.targetUrl}
              className="group relative bg-white rounded-sm shadow-[0_10px_30px_rgba(11,29,48,0.07)] hover:shadow-[0_20px_45px_rgba(223,113,27,0.22)] transition-all duration-300 flex flex-col overflow-hidden border border-[#E7E2D8]/80 hover:border-[#DF711B] hover:-translate-y-1"
            >
              {/* Top Photo */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={pillar.image}
                  alt={pillar.shortTitle}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Card Body: White default -> Orange gradient on hover */}
              <div className="relative flex-1 p-4 sm:p-6 flex flex-col justify-between bg-white group-hover:bg-gradient-to-b group-hover:from-[#F4931E] group-hover:to-[#DF711B] transition-colors duration-300">
                <div>
                  <h3 className="font-sans font-bold text-[17px] sm:text-[18px] leading-snug text-[#0B1D30] group-hover:text-white transition-colors duration-300 m-0">
                    <span className="sm:hidden text-[#DF711B] group-hover:text-white mr-1.5">
                      {idx + 1}.
                    </span>
                    {pillar.shortTitle}
                  </h3>

                  <div className="my-2.5 sm:my-3 h-[1px] w-full bg-slate-200 group-hover:bg-white/30 transition-colors duration-300" />

                  {/* On mobile: compact statement only (no hidden hover ul inflating height). On sm+: grid stack prevents hover jump */}
                  <div className="sm:grid">
                    {/* Default vision statement */}
                    <p className="sm:col-start-1 sm:row-start-1 text-[13px] leading-relaxed text-slate-600 opacity-100 sm:group-hover:opacity-0 transition-opacity duration-200 m-0">
                      {pillar.visionStatement}
                    </p>

                    {/* Hover key points list (desktop/tablet only) */}
                    <ul className="hidden sm:flex sm:col-start-1 sm:row-start-1 flex-col gap-1.5 text-[12px] font-medium text-white/95 list-none p-0 m-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                      {pillar.keyPoints.map((point) => (
                        <li key={point} className="leading-snug border-b border-white/15 pb-1 last:border-b-0 last:pb-0">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom-right square arrow button */}
                <div className="pt-3 sm:pt-5 flex justify-end">
                  <span className="w-7 h-7 rounded-[2px] border border-[#DF711B]/70 group-hover:border-white/80 text-[#DF711B] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
