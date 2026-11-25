import React, { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Preloader } from '../components/common/Preloader';
import { SmoothScrollProvider } from '../components/common/SmoothScrollProvider';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { ChatbotFAB } from '../components/common/ChatbotFAB';
import { AdmissionGuidanceModal } from '../components/common/AdmissionGuidanceModal';
import { SEOHead } from '../components/common/SEOHead';

export const MainLayout: React.FC = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <SmoothScrollProvider>
      <SEOHead />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-[#181C20] selection:bg-[#DF711B] selection:text-white">
        <Preloader onComplete={() => setPreloaderDone(true)} />
        <Header />
        <main className="flex-1">
          <Suspense fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#DF711B] border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Outlet context={{ preloaderDone }} />
          </Suspense>
        </main>
        <Footer />
        <ChatbotFAB />
        <AdmissionGuidanceModal />
      </div>
    </SmoothScrollProvider>
  );
};
