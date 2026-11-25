import React from 'react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';
import { 
  HOME_VALUES_TILES, 
  PANEL_B_MOVING_GALLERY_COL1, 
  PANEL_B_MOVING_GALLERY_COL2 
} from '../../data/images';

export const HorizontalPanelGallery: React.FC = () => {
  const valuesData = HOME_VALUES_TILES;
  const col1Photos = PANEL_B_MOVING_GALLERY_COL1;
  const col2Photos = PANEL_B_MOVING_GALLERY_COL2;

  return (
    <div className="relative w-full bg-[#FFFFFF]">
      <style>{`
        @keyframes marqueeUp {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-up {
          animation: marqueeUp 24s linear infinite;
        }
        .animate-marquee-up-slow {
          animation: marqueeUp 32s linear infinite;
        }
        .animate-marquee-up:hover, .animate-marquee-up-slow:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full overflow-hidden">
        <div className="flex flex-col w-full">
          {/* ============================================================
              PANEL A - "WE VALUE" GRID
              ============================================================ */}
          <section className="panel panel--values w-full bg-[#FFFFFF] flex flex-col justify-center px-[6%] lg:px-[8%] py-10 sm:py-12 lg:py-14 border-b border-[#E5E5E5] box-border relative">
            {/* Top-left Big Headline */}
            <div className="mb-6 lg:mb-8 shrink-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-[0.25em] text-[#DF711B] font-bold mb-2">
                  CORE FOUNDATION • CVP ETHOS
                </span>
                <h2 className="font-display text-[32px] xs:text-[40px] sm:text-[54px] lg:text-[60px] xl:text-[64px] font-black text-[#181818] tracking-tight leading-none uppercase m-0">
                  WE VALUE
                </h2>
              </div>
            </div>

            {/* 4-Column Equal-Width Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 w-full max-w-[1400px]">
              {valuesData.map((item) => (
                <div key={item.num} className="flex flex-col group">
                  {/* Large Numeral overlapping the photo top-left */}
                  <div className="relative mb-[-18px] z-10 pl-2">
                    <span className="font-display text-[46px] lg:text-[54px] font-black text-[#DF711B] leading-none tracking-tighter drop-shadow-sm select-none">
                      {item.num}
                    </span>
                  </div>

                  {/* Near-Square Photo (responsive on mobile) */}
                  <div className="w-full aspect-[16/10] sm:aspect-square bg-[#F0ECE1] overflow-hidden border border-[#181818]/10 shadow-xs relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('/images/pages/home/horizontal_values/val-01-curiosity.webp')) {
                          target.src = '/images/pages/home/horizontal_values/val-01-curiosity.webp';
                        }
                      }}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out" 
                    />
                    <div className="absolute inset-0 bg-[#DF711B]/5 group-hover:opacity-0 transition-opacity" />
                  </div>

                  {/* Text Details Below Photo */}
                  <div className="pt-3.5 space-y-1.5">
                    <h3 className="font-display text-[22px] lg:text-[24px] xl:text-[26px] font-black text-[#DF711B] uppercase tracking-tight leading-tight m-0">
                      {item.title}
                    </h3>
                    <p className="text-[14px] lg:text-[15px] text-[#555555] font-normal leading-snug mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* ============================================================
              PANEL B -"END STATE" (ACHIEVEMENT + VERTICAL MOVING GALLERY)
              ============================================================ */}
          <section className="panel panel--award w-full lg:h-[580px] xl:h-[620px] bg-[#FFFFFF] flex flex-col lg:flex-row items-stretch border-b border-[#E5E5E5] box-border relative overflow-hidden">
            
            {/* ZONE A - LEFT (~26% width): Studio Backdrop & Cutout Composite Image */}
            <div className="w-full h-[340px] sm:h-[440px] lg:h-full lg:w-[26%] xl:w-[25%] relative flex items-center justify-center overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-[#E5E5E5] bg-white">
              <img 
                src="/images/panel_b_achiever_design.webp" 
                alt="Chinmaya Vidyalaya Student Achiever Studio Design" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center relative z-10"
              />
            </div>

            {/* ZONE B - MIDDLE (~40% width): Typography, Stats & Text-Link Rule CTA */}
            <div className="w-full lg:w-[40%] xl:w-[39%] flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-14 py-10 lg:py-12 box-border border-b lg:border-b-0 lg:border-r border-[#E5E5E5]">
              <div className="max-w-[560px] space-y-5">
                
                {/* Small Eyebrow Line */}
                <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-display font-black text-[#DF711B] uppercase tracking-[0.2em] leading-tight">
                  THAT'S WHY FOR THREE DECADES IN A ROW, WE ARE
                </div>

                {/* Big Display Headline */}
                <h2 className="font-display text-[24px] xs:text-[30px] sm:text-[42px] lg:text-[46px] xl:text-[54px] font-black text-[#181818] tracking-tight leading-[1.05] uppercase m-0">
                  PALGHAR DISTRICT'S BEST CBSE SCHOOL
                </h2>

                {/* Supporting Body Paragraph */}
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#555555] font-normal leading-relaxed">
                  Imparting value-integrated academic brilliance at Tarapur under the aegis of the Chinmaya Vision Programme. Recognized by CBSE New Delhi (Affiliation No. {OFFICIAL_SCHOOL_INFO.affiliationNo}) with consecutive 100% AISSE board distinctions, modern Science (Physics, Chemistry, Biology) and Maths laboratories, and holistic spiritual grounding.
                </p>

                {/* Metrics Callout Strip */}
                <div className="grid grid-cols-3 gap-3 pt-2 pb-2 border-y border-[#E5E5E5]">
                  <div>
                    <span className="font-display text-[22px] lg:text-[28px] font-black text-[#DF711B] leading-none block">
                      100%
                    </span>
                    <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mt-1">
                      AISSE Pass
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-[22px] lg:text-[28px] font-black text-[#DF711B] leading-none block">
                      31+
                    </span>
                    <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mt-1">
                      Years Schooling
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-[22px] lg:text-[28px] font-black text-[#DF711B] leading-none block">
                      1600+
                    </span>
                    <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mt-1">
                      Students on Roll
                    </span>
                  </div>
                </div>



              </div>
            </div>

            {/* ZONE C - RIGHT (~34-36% width): VERTICAL MOVING UPWARD IMAGE GALLERY */}
            <div className="w-full lg:w-[34%] xl:w-[36%] h-[360px] sm:h-[440px] lg:h-full bg-white relative overflow-hidden flex gap-3.5 p-3 sm:p-4 box-border">
              
              {/* Column 1 (Scrolls UP continuously) */}
              <div className="w-1/2 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 flex flex-col gap-3.5 animate-marquee-up">
                  {[...col1Photos, ...col1Photos].map((photo, i) => (
                    <div 
                      key={`col1-${i}`}
                      className="group relative w-full aspect-[4/3] bg-[#E7E2D8] overflow-hidden rounded-xl border border-[#181818]/10 shadow-xs shrink-0"
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.includes('.webp')) {
                            target.src = target.src.replace(/\.webp($|\?)/, '.jpg$1');
                            return;
                          }
                          if (!target.src.includes('/images/banner-1.jpg')) {
                            target.src = '/images/banner-1.jpg';
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2 (Scrolls UP continuously at varied speed) */}
              <div className="w-1/2 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 flex flex-col gap-3.5 animate-marquee-up-slow">
                  {[...col2Photos, ...col2Photos].map((photo, i) => (
                    <div 
                      key={`col2-${i}`}
                      className="group relative w-full aspect-[4/3] bg-[#E7E2D8] overflow-hidden rounded-xl border border-[#181818]/10 shadow-xs shrink-0"
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.includes('.webp')) {
                            target.src = target.src.replace(/\.webp($|\?)/, '.jpg$1');
                            return;
                          }
                          if (!target.src.includes('/images/banner-1.jpg')) {
                            target.src = '/images/banner-1.jpg';
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Top & Bottom Fade Overlays for seamless loop */}
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

            </div>

          </section>

        </div>
      </div>
    </div>
  );
};
