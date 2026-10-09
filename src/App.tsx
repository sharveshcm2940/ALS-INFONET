/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MechanicalConsole } from './components/MechanicalConsole';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WorkSection } from './components/WorkSection';
import { ApproachSection } from './components/ApproachSection';
import { TechnologySection } from './components/TechnologySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let lenis: Lenis | null = null;
    let animationFrameId: number;

    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true
      });

      function raf(time: number) {
        if (lenis) {
          lenis.raf(time);
        }
        animationFrameId = requestAnimationFrame(raf);
      }

      animationFrameId = requestAnimationFrame(raf);
    } catch {
      // Graceful fallback to native browser smooth scrolling
    }

    return () => {
      if (lenis) lenis.destroy();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#E50914] text-neutral-900 selection:bg-neutral-950 selection:text-white">
      {/* Top Navigation */}
      <Navbar onTalkClick={scrollToContact} />

      {/* Hero with Mechanical Rolling Counter */}
      <Hero
        onExploreWork={scrollToWork}
        onStartProject={scrollToContact}
      />

      {/* Architecture Workbench & Client Success Stories */}
      <MechanicalConsole />

      {/* 01 / About Section */}
      <AboutSection onContactClick={scrollToContact} />

      {/* 02 / Services Section */}
      <ServicesSection onTalkClick={scrollToContact} />

      {/* 03 / Selected Work */}
      <WorkSection onContactClick={scrollToContact} />

      {/* 04 / Our Approach */}
      <ApproachSection />

      {/* 05 / Insights & Capabilities */}
      <TechnologySection onContactClick={scrollToContact} />

      {/* 06 / Contact & Inquiries (Vivid Red) */}
      <ContactSection />

      {/* Footer (Almost Black) */}
      <Footer />
    </div>
  );
}
