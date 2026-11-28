import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
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
      className="relative w-full py-6 sm:py-8 lg:py-10 bg-[#FCFBF7] border-y border-[#E7E2D8] text-[#181C20] font-sans overflow-hidden"
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

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 space-y-5 lg:space-y-6">

        {/* ----------------------------------------------------
            EDITORIAL MASTHEAD
           ---------------------------------------------------- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-4 border-b border-[#181C20]/10">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">

          {/* LEFT 7 COLUMNS: VISION & MISSION PLAQUE */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <picture className="flex items-center justify-center w-full">
              <source srcSet="/images/vision-mission-plaque.webp" type="image/webp" />
              <img
                src="/images/vision-mission-plaque.png"
                alt="Chinmaya Vidyalaya Our Vision and Our Mission Plaque"
                loading="lazy"
                decoding="async"
                className="w-auto max-w-full max-h-[500px] sm:max-h-[560px] lg:max-h-[620px] object-contain mx-auto drop-shadow-[0_18px_40px_rgba(11,29,48,0.12)] select-none"
              />
            </picture>
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
              <div className="flex-1 divide-y divide-[#E7E2D8]/80 px-3 sm:px-4 py-1.5">
                {UPCOMING_EVENTS.slice(0, 3).map((ev) => {
                  const { monthShort, day } = parseBadgeDate(ev.date);
                  const isExpanded = expandedEventId === ev.id;

                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setExpandedEventId(isExpanded ? null : ev.id)}
                      className={`w-full text-left group p-3.5 my-1 rounded-2xl transition-all duration-200 flex items-start gap-4 cursor-pointer ${isExpanded
                        ? 'bg-[#FAF3E8]/70 ring-1 ring-[#DF711B]/25'
                        : 'hover:bg-[#FCFBF7]'
                        }`}
                    >
                      {/* Editorial Date Tile */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 text-center px-2 py-1.5 border transition-colors ${isExpanded
                          ? 'bg-[#DF711B] border-[#DF711B] text-white shadow-sm'
                          : 'bg-[#FCFBF7] border-[#E7E2D8] text-[#181C20] group-hover:border-[#DF711B]/50'
                          }`}
                      >
                        <span
                          className={`text-[9px] font-mono font-bold uppercase tracking-wider leading-none ${isExpanded ? 'text-[#FFF7DF]' : 'text-[#DF711B]'
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
                            className={`w-3.5 h-3.5 transition-transform ${isExpanded
                              ? 'text-[#DF711B] rotate-45'
                              : 'text-slate-400 group-hover:text-[#DF711B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                              }`}
                          />
                        </div>

                        <h4 className="font-display font-extrabold text-[15px] sm:text-base text-[#181C20] leading-snug m-0">
                          {ev.title}
                        </h4>

                        <p
                          className={`text-xs text-slate-600 leading-relaxed m-0 ${isExpanded ? '' : 'line-clamp-1'
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
