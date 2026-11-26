import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Target, Calendar, Clock, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import { UPCOMING_EVENTS } from '../../data/events';

const parseBadgeDate = (dateStr: string): { monthShort: string; day: string } => {
  const parts = dateStr.replace(',', '').split(' ');
  const monthShort = (parts[0] || '').slice(0, 3).toUpperCase();
  const day = parts[1] || '';
  return { monthShort, day };
};

export const MissionVisionBulletinSection: React.FC = () => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(UPCOMING_EVENTS[0]?.id ?? null);

  return (
    <section
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#FCFBF7] border-y border-[#E7E2D8] text-[#181C20] font-sans overflow-hidden"
      aria-label="School Vision, Mission and Upcoming Events Bulletin"
    >
      {/* Subtle architectural background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#D5CEC2 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8 lg:space-y-10">
        
        {/* ----------------------------------------------------
            EDITORIAL MASTHEAD
           ---------------------------------------------------- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#181C20]/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.26em] text-[#DF711B] font-bold">
              <span className="w-6 h-[2px] bg-[#DF711B]" />
              <span>CHINMAYA VISION PROGRAMME • ETHOS &amp; DISPATCH</span>
            </div>
            <h2 className="font-display text-[28px] sm:text-[38px] lg:text-[44px] font-black text-[#181C20] tracking-tight leading-[1.02] m-0">
              OUR VISION, MISSION{' '}
              <span className="font-serif italic font-semibold text-[#DF711B] tracking-normal">
                &amp; Campus Bulletin
              </span>
            </h2>
          </div>

          <Link
            to="/about/mission-vision"
            className="group inline-flex items-center gap-2.5 self-start md:self-auto px-4 py-2.5 rounded-full bg-white border border-[#E7E2D8] hover:border-[#DF711B] text-[#181C20] hover:text-[#DF711B] text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            <span>Explore Framework</span>
            <span className="w-6 h-6 rounded-full bg-[#FCFBF7] group-hover:bg-[#DF711B] group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* ----------------------------------------------------
            ASYMMETRIC BENTO-EDITORIAL GRID
           ---------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT 7 COLUMNS: VISION & MISSION */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* 01 // OUR VISION - OBSIDIAN EDITORIAL CARD */}
            <article className="group relative flex-1 rounded-3xl bg-[#0B1D30] text-white p-6 sm:p-8 lg:p-9 overflow-hidden shadow-[0_24px_60px_rgba(11,29,48,0.16)] border border-white/10 flex flex-col justify-between gap-6">
              {/* Oversized Architectural Watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute right-5 bottom-2 font-display font-black text-[96px] sm:text-[120px] leading-none text-white/[0.04] tracking-tighter"
              >
                01
              </span>

              <div className="relative z-10 space-y-5">
                {/* Top Meta Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DF711B] to-[#FFB740] text-white flex items-center justify-center shadow-md shrink-0">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#FFB740] block">
                        01 / Institutional Vision
                      </span>
                      <h3 className="font-cinzel text-xl sm:text-2xl font-extrabold text-white tracking-tight m-0">
                        Our Vision
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono font-semibold text-[#FFF7DF] uppercase tracking-wider">
                    Pioneering Future
                  </span>
                </div>

                {/* Editorial Pull Quote */}
                <blockquote className="font-serif italic text-lg sm:text-[22px] lg:text-[24px] text-white font-medium leading-[1.4] border-l-2 border-[#FFB740] pl-4 sm:pl-5 m-0">
                  “To empower a community of learners who dare to dream, take risks and develop new realities.”
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl m-0">
                  We envision graduates who are self-reliant, intellectually bold, emotionally poised, and morally steadfast—equipped with modern CBSE scientific competencies and rooted in timeless cultural integrity.
                </p>
              </div>

              {/* Glassmorphic Pillar Tags */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                {['Fearless Inquiry', 'Creative Risk-Taking', 'Ethical Leadership'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/15 text-[11px] font-medium text-slate-100 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* 02 // OUR MISSION - ARCHIVAL IVORY EDITORIAL CARD */}
            <article className="group relative flex-1 rounded-3xl bg-white text-[#181C20] p-6 sm:p-8 lg:p-9 overflow-hidden shadow-[0_14px_40px_rgba(24,28,32,0.05)] border border-[#E7E2D8] hover:border-[#DF711B]/50 transition-colors flex flex-col justify-between gap-6">
              {/* Oversized Architectural Watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute right-5 bottom-2 font-display font-black text-[96px] sm:text-[120px] leading-none text-[#181C20]/[0.03] tracking-tighter"
              >
                02
              </span>

              <div className="relative z-10 space-y-5">
                {/* Top Meta Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1D30] text-white flex items-center justify-center shadow-sm shrink-0">
                      <Target className="w-5 h-5 text-[#FFB740]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#DF711B] block">
                        02 / Sacred Mission
                      </span>
                      <h3 className="font-cinzel text-xl sm:text-2xl font-extrabold text-[#181C20] tracking-tight m-0">
                        Our Mission
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#FAF3E8] border border-[#DF711B]/25 text-[10px] font-mono font-bold text-[#DF711B] uppercase tracking-wider">
                    Timeless Values
                  </span>
                </div>

                {/* Editorial Pull Quote */}
                <blockquote className="font-serif italic text-lg sm:text-[22px] text-[#181C20] font-semibold leading-[1.4] border-l-2 border-[#DF711B] pl-4 sm:pl-5 m-0">
                  “To offer value-based holistic education that integrates ancient Indian cultural ethos with modern scientific inquiry.”
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl m-0">
                  Nurturing physical vitality, mental agility, intellectual depth, and spiritual awakening through the 4 pillars of the Chinmaya Vision Programme, molding patriotic citizens with universal empathy.
                </p>
              </div>

              {/* Footer Tags */}
              <div className="relative z-10 pt-4 border-t border-[#E7E2D8] flex flex-wrap items-center gap-2">
                {['Value Education', 'Scientific Temper', 'Global Brotherhood'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#FCFBF7] border border-[#E7E2D8] text-[11px] font-semibold text-[#181C20]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

          </div>

          {/* RIGHT 5 COLUMNS: CURATED CAMPUS DISPATCH / UPCOMING EVENTS BULLETIN */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-3xl bg-white border border-[#E7E2D8] shadow-[0_20px_50px_rgba(11,29,48,0.06)] overflow-hidden flex flex-col h-full">
              
              {/* Editorial Dispatch Header */}
              <div className="px-6 py-5 bg-[#FCFBF7] border-b border-[#E7E2D8] flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DF711B] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DF711B]" />
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#DF711B] font-bold">
                      LIVE CAMPUS DISPATCH
                    </span>
                  </div>
                  <h3 className="font-display font-black text-xl text-[#181C20] tracking-tight m-0">
                    Upcoming Events Bulletin
                  </h3>
                </div>

                <Link
                  to="/academics/calendar"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E7E2D8] hover:border-[#DF711B] text-[#181C20] hover:text-[#DF711B] text-[10px] font-mono font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0"
                >
                  <Calendar className="w-3 h-3 text-[#DF711B]" />
                  <span>2026–27</span>
                </Link>
              </div>

              {/* Interactive Timeline Feed */}
              <div className="flex-1 divide-y divide-[#E7E2D8]/80 px-3 sm:px-4 py-2">
                {UPCOMING_EVENTS.slice(0, 5).map((ev) => {
                  const { monthShort, day } = parseBadgeDate(ev.date);
                  const isExpanded = expandedEventId === ev.id;

                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setExpandedEventId(isExpanded ? null : ev.id)}
                      className={`w-full text-left group p-3.5 my-1 rounded-2xl transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                        isExpanded
                          ? 'bg-[#FAF3E8]/70 ring-1 ring-[#DF711B]/25'
                          : 'hover:bg-[#FCFBF7]'
                      }`}
                    >
                      {/* Editorial Date Tile */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 text-center px-2 py-1.5 border transition-colors ${
                          isExpanded
                            ? 'bg-[#DF711B] border-[#DF711B] text-white shadow-sm'
                            : 'bg-[#FCFBF7] border-[#E7E2D8] text-[#181C20] group-hover:border-[#DF711B]/50'
                        }`}
                      >
                        <span
                          className={`text-[9px] font-mono font-bold uppercase tracking-wider leading-none ${
                            isExpanded ? 'text-[#FFF7DF]' : 'text-[#DF711B]'
                          }`}
                        >
                          {monthShort}
                        </span>
                        <span className="font-display font-black text-xl leading-tight tabular-nums mt-0.5">
                          {day}
                        </span>
                      </div>

                      {/* Event Content */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-white border border-[#E7E2D8] text-[#0B1D30] text-[9px] font-mono font-bold uppercase tracking-wider">
                            {ev.tag}
                          </span>
                          <ArrowUpRight
                            className={`w-3.5 h-3.5 transition-transform ${
                              isExpanded
                                ? 'text-[#DF711B] rotate-45'
                                : 'text-slate-400 group-hover:text-[#DF711B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                            }`}
                          />
                        </div>

                        <h4 className="font-display font-extrabold text-[15px] sm:text-base text-[#181C20] leading-snug m-0">
                          {ev.title}
                        </h4>

                        <p
                          className={`text-xs text-slate-600 leading-relaxed m-0 ${
                            isExpanded ? '' : 'line-clamp-1'
                          }`}
                        >
                          {isExpanded ? ev.desc : ev.summary}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-[11px] font-mono text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#DF711B]" />
                            {ev.time}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#DF711B]" />
                            {ev.venue}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bulletin Footer Action */}
              <div className="px-6 py-4 bg-[#FCFBF7] border-t border-[#E7E2D8] flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-slate-500 font-semibold">
                  {UPCOMING_EVENTS.length} Upcoming Events
                </span>
                <Link
                  to="/news"
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1D30] hover:bg-[#DF711B] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Full Bulletin</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFB740] group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
