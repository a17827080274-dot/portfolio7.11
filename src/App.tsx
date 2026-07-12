/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Globe, ChevronDown, ArrowUp } from "lucide-react";
import SeamlessGallerySection from "./components/SeamlessGallerySection";
import { PersonalIntroSection } from "./components/PersonalIntroSection";

export default function App() {
  const [lang, setLang] = useState<"EN" | "ZH">("ZH");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loaderStep, setLoaderStep] = useState<number>(0);
  const [isOverHalf, setIsOverHalf] = useState<boolean>(false);
  const [isOverNinety, setIsOverNinety] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);
  const [activeCardId, setActiveCardId] = useState<string>("layout-poster");
  const [activeSection, setActiveSection] = useState<"HOME" | "PROJECTS" | "ABOUT">("HOME");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  // High-performance scroll tracking on the scroll container
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: section1Ref,
    offset: ["start start", "end end"]
  });

  // Apply a butter-smooth spring to the raw scroll value for physical momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.0001
  });

  // Calculate direct, reactive transforms on the compositor thread
  const rotateOuter = useTransform(smoothProgress, [0, 1], [0, -180]);
  const scaleInnerGroup = useTransform(smoothProgress, [0, 1], [1, 1.32]);
  const rotateInnerGroup = useTransform(smoothProgress, [0, 1], [0, 35]);
  const scaleInnermost = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  const textOpacity = useTransform(smoothProgress, [0, 0.35, 1], [0, 0, 1]);
  const textY = useTransform(smoothProgress, [0, 1], [20, 0]);

  // Scroll handler that maps scrollTop of the scrollable app-root to progress 0.0 -> 1.0
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const viewportHeight = window.innerHeight || 800;
    // Section 1's scrollable range is exactly 100vh (from start to when turquoise block fully covers the right side)
    const newProgress = Math.min(1, Math.max(0, scrollTop / viewportHeight));
    
    const overHalf = newProgress > 0.5;
    const overNinety = newProgress >= 0.9;
    
    setIsOverHalf((prev) => (prev !== overHalf ? overHalf : prev));
    setIsOverNinety((prev) => (prev !== overNinety ? overNinety : prev));

    // Dynamic active nav section detection based on actual element offsets
    const section2 = document.getElementById("production-portfolio-section");
    const sectionAbout = document.getElementById("personal-intro-section");
    
    if (scrollContainerRef.current) {
      const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
      
      let currentSection: "HOME" | "PROJECTS" | "ABOUT" = "HOME";
      
      if (sectionAbout) {
        const aboutTop = sectionAbout.getBoundingClientRect().top - containerTop;
        if (aboutTop <= 160) {
          currentSection = "ABOUT";
        } else if (section2) {
          const section2Top = section2.getBoundingClientRect().top - containerTop;
          if (section2Top <= 160) {
            currentSection = "PROJECTS";
          }
        }
      }
      
      setActiveSection(currentSection);
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    if (section2Ref.current) {
      section2Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById("personal-intro-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Keyboard scroll support: scroll the container, which automatically drives the progress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;
      const viewportHeight = window.innerHeight || 800;
      if (e.key === "ArrowDown") {
        scrollContainerRef.current.scrollBy({ top: viewportHeight * 0.15, behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        scrollContainerRef.current.scrollBy({ top: -viewportHeight * 0.15, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Natural loader sequence driven by states (made faster, punchier, and more cohesive)
  useEffect(() => {
    // Critical showcase images to preload (high priority .jpg files and user portrait)
    const criticalImages = [
      "/showcase/layout_posters.jpg",
      "/showcase/ai_contest.jpg",
      "/showcase/speculative_design.jpg",
      "/showcase/other_designs.jpg",
      "/showcase/b8ea99c7fef30531f5ed178f3606a0cf 2.png"
    ];

    let loadedCount = 0;
    const totalToLoad = criticalImages.length;
    let minTimePassed = false;
    let imagesLoaded = false;
    let hasTimedOut = false;

    const tryFinishLoading = () => {
      if (minTimePassed && (imagesLoaded || hasTimedOut)) {
        setIsLoading(false);
      }
    };

    const onImageLoadedOrFailed = () => {
      loadedCount++;
      if (loadedCount >= totalToLoad) {
        imagesLoaded = true;
        tryFinishLoading();
      }
    };

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = onImageLoadedOrFailed;
      img.onerror = onImageLoadedOrFailed;
    });

    // Background prefetch non-critical format variants
    const nonCritical = [
      "/showcase/layout_posters.png",
      "/showcase/ai_contest.png",
      "/showcase/speculative_design.png",
      "/showcase/other_designs.png"
    ];
    nonCritical.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Stage 1: Pink circle grows gracefully
    const t1 = setTimeout(() => setLoaderStep(1), 200);
    // Stage 2: Grey circle grows inside with a fluid lag
    const t2 = setTimeout(() => setLoaderStep(2), 600);
    // Stage 3: Innermost dot and concentric tactile circles fade in softly
    const t3 = setTimeout(() => setLoaderStep(3), 1000);
    // Stage 4: Text elements fade in and rotate into place
    const t4 = setTimeout(() => setLoaderStep(4), 1400);
    
    // Stage 5: Minimum visual animation duration (2000ms)
    const t5 = setTimeout(() => {
      minTimePassed = true;
      tryFinishLoading();
    }, 2000);

    // Stage 6: Safety network timeout (4500ms max wait)
    const t6 = setTimeout(() => {
      hasTimedOut = true;
      minTimePassed = true;
      setIsLoading(false);
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  return (
    <>
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`relative h-screen w-full flex flex-col transition-colors duration-1000 ${isLoading ? "bg-white" : "bg-[#f0f0f0]"} text-zinc-900 font-sans select-none scroll-smooth ${isLoading ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"}`} 
        id="app-root"
      >
        {/* 1. GLOBAL FIXED HEADER (fixed so it stays overlayed at the top of the viewport) */}
        <motion.header 
          initial={{ y: -80, opacity: 0 }}
          animate={isLoading ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 h-20 flex items-center z-50 pointer-events-auto bg-[#dbdbdb]" 
          id="main-header"
        >
          {/* Left Portion of Header: Aligns with Left Panel (60% on desktop, 100% on mobile) */}
          <div className="w-full md:w-[60%] px-6 md:px-12 h-full flex items-center justify-between md:justify-center relative" id="header-left-half">
            {/* Language Switcher on the left */}
            <div className="md:absolute md:left-12 flex items-center" id="header-left-group">
              {/* Language Switcher Button */}
              <div className="relative" id="language-switcher-container">
                <button 
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-full border border-zinc-400 bg-transparent hover:border-zinc-800 transition-all text-xs font-mono font-medium tracking-wider cursor-pointer text-zinc-700"
                  id="lang-selector"
                >
                  <span>{lang === "EN" ? "EN" : "ZH"}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-zinc-600 transition-transform duration-300 ${showLangDropdown ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {showLangDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-0 mt-2 w-28 bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden py-1 z-50 text-xs"
                      id="lang-dropdown"
                    >
                      <button 
                        onClick={() => { setLang("EN"); setShowLangDropdown(false); }}
                        className={`w-full text-left px-4 py-2 hover:bg-zinc-100 transition-colors font-mono ${lang === "EN" ? "font-bold text-pink-600 bg-pink-50/50" : ""}`}
                      >
                        English
                      </button>
                      <button 
                        onClick={() => { setLang("ZH"); setShowLangDropdown(false); }}
                        className={`w-full text-left px-4 py-2 hover:bg-zinc-100 transition-colors font-sans ${lang === "ZH" ? "font-bold text-pink-600 bg-pink-50/50" : ""}`}
                      >
                        简体中文
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation links centered perfectly within this left portion on desktop */}
            <div className="hidden md:flex justify-center" id="header-center-group">
              <nav 
                className="flex items-center gap-10 md:gap-14 text-[11px] md:text-xs font-sans font-bold tracking-wider text-zinc-600" 
                id="main-nav"
                style={{ paddingLeft: "-2px", paddingRight: "2px", paddingBottom: "5px" }}
              >
                <button 
                  onClick={scrollToTop}
                  className={`transition-all hover:text-zinc-950 cursor-pointer relative py-2 ${activeSection === "HOME" ? "text-zinc-950 font-bold" : "text-zinc-500"}`}
                  id="nav-home"
                >
                  HOME
                  {activeSection === "HOME" && (
                    <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
                  )}
                </button>
                <button 
                  onClick={scrollToProjects}
                  className={`transition-all hover:text-zinc-950 cursor-pointer relative py-2 ${activeSection === "PROJECTS" ? "text-zinc-950 font-bold" : "text-zinc-500"}`}
                  id="nav-projects"
                >
                  PROJECTS
                  {activeSection === "PROJECTS" && (
                    <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
                  )}
                </button>
                <button 
                  onClick={scrollToAbout}
                  className={`transition-all hover:text-zinc-950 cursor-pointer relative py-2 ${activeSection === "ABOUT" ? "text-zinc-950 font-bold" : "text-zinc-500"}`}
                  id="nav-about"
                >
                  ABOUT
                  {activeSection === "ABOUT" && (
                    <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
                  )}
                </button>
              </nav>
            </div>

            {/* Mobile Connect Button & Badge (only visible inside header-left-half wrapper when space is tight on mobile) */}
            <div className="flex md:hidden items-center gap-4" id="header-right-mobile">
              <button 
                onClick={scrollToAbout}
                className="px-6 py-2 rounded-full bg-black text-white hover:bg-zinc-800 transition-all text-[11px] font-sans font-bold uppercase tracking-wider cursor-pointer shadow-sm shrink-0"
                id="btn-connect-mobile"
              >
                connect me
              </button>
              <div 
                className="relative flex items-center justify-center select-none cursor-pointer w-10 h-10" 
                id="hx-badge-mobile" 
                onClick={scrollToTop}
              >
                <svg viewBox="0 0 80 80" className="w-10 h-10 overflow-visible" id="badge-rotating-svg-mobile">
                  <defs>
                    <path
                      id="badge-text-path-mobile"
                      d="M 40,12 A 28,28 0 1,1 39.9,12"
                      fill="none"
                    />
                  </defs>
                  <circle cx="40" cy="40" r="20" fill="#ff3b8d" />
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    style={{ transformOrigin: "40px 40px" }}
                  >
                    <text fill="#ffffff" fontSize="7.2" fontWeight="800" className="font-sans tracking-[0.16em]">
                      <textPath href="#badge-text-path-mobile" startOffset="0%">
                        HAZEL STUDIO • HAZEL STUDIO •
                      </textPath>
                    </text>
                  </motion.g>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Portion of Header: Aligns with Right Panel (40% on desktop, completely hidden on mobile) */}
          <div className="hidden md:flex md:w-[40%] px-6 md:px-12 h-full items-center justify-end gap-4 md:gap-6" id="header-right">
            <button 
              onClick={scrollToAbout}
              className="px-8 py-2 rounded-full bg-black text-white hover:bg-zinc-800 transition-all text-xs font-sans font-bold uppercase tracking-wider cursor-pointer shadow-sm shrink-0"
              id="btn-connect"
            >
              connect me
            </button>

            {/* Solid pink circle with curved rotating HAZEL STUDIO text path around it */}
            <div 
              className="relative flex items-center justify-center select-none cursor-pointer w-14 h-14" 
              id="hx-badge" 
              onClick={scrollToTop}
            >
              <svg viewBox="0 0 80 80" className="w-14 h-14 overflow-visible" id="badge-rotating-svg">
                <defs>
                  <path
                    id="badge-text-path"
                    d="M 40,12 A 28,28 0 1,1 39.9,12"
                    fill="none"
                  />
                </defs>
                {/* Solid Pink circle in the center */}
                <circle cx="40" cy="40" r="20" fill="#ff3b8d" />
                
                {/* Rotating white text around the pink circle */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  style={{ transformOrigin: "40px 40px" }}
                >
                  <text fill="#ffffff" fontSize="7.2" fontWeight="800" className="font-sans tracking-[0.16em]">
                    <textPath href="#badge-text-path" startOffset="0%">
                      HAZEL STUDIO • HAZEL STUDIO •
                    </textPath>
                  </text>
                </motion.g>
              </svg>
            </div>
          </div>
        </motion.header>

      {/* 2. SPLIT SCREEN PANELS STICKY SCROLL SECTION */}
      <div 
        ref={section1Ref}
        className="relative w-full h-[150vh] md:h-[200vh] flex flex-col md:flex-row z-10" 
        id="section-1-wrapper"
      >
        
        {/* LEFT PANEL: FOCUSING RING ON WHITE CANVAS */}
        <motion.div 
          initial={{ width: "100%" }}
          animate={{
            width: isLoading ? "100%" : (isMobile ? "100%" : "60%"),
            height: isMobile ? (isLoading ? "100vh" : "50vh") : "100vh",
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`sticky top-0 bg-white flex items-center justify-center overflow-hidden z-10 ${
            isLoading ? "" : "border-b md:border-b-0 md:border-r border-zinc-200"
          }`}
          id="left-focus-panel"
        >
          {/* STATIC CYAN ROUNDED RECTANGLE AT THE TOP RIGHT OF FOCUS RING */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isLoading ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 1 }}
            className="absolute top-24 md:top-28 right-8 md:right-16 w-32 h-10 bg-[#00d5c3] z-30"
            id="static-cyan-badge"
          />

          {/* FOCUSING RING CONTAINER */}
          <div 
            className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[720px] lg:h-[720px] xl:w-[840px] xl:h-[840px] max-w-[92%] max-h-[92%] flex items-center justify-center z-10 origin-center" 
            id="focus-ring-stage"
          >
            
            {/* The Animated Focusing Ring SVG container */}
            <div
              className="w-full h-full select-none pointer-events-none"
              id="focus-ring-vector-container"
            >
              <svg 
                viewBox="0 0 600 600" 
                className="w-full h-full select-none overflow-visible"
                id="focus-ring-svg"
              >
                {/* SVG TEXT PATH DEFS FOR CURVED TEXT OUTSIDE AND INSIDE THE RING */}
                <defs>
                  {/* Top outer arc path that is concentric with a moderate gap to the pink circle (R_pink=185, Path R=195) */}
                  <path 
                    id="outerTopArc" 
                    d="M 105,300 A 195,195 0 0,1 495,300" 
                    fill="none" 
                  />
                  {/* Bottom outer arc path that is concentric with a moderate gap to the pink circle (R_pink=185, Path R=195) */}
                  <path 
                    id="outerBottomArc" 
                    d="M 495,300 A 195,195 0 0,1 105,300" 
                    fill="none" 
                  />
                </defs>

                 {/* Main Rotatable Group: ensures perfect concentric alignment around (300,300) */}
                 {/* This unified group handles the beautiful intro rotation during loading, and transitions seamlessly to scroll rotation at scroll-top (0deg) */}
                <motion.g
                  style={isLoading ? {
                    transformOrigin: "300px 300px",
                    transformBox: "view-box"
                  } : { 
                    rotate: rotateOuter,
                    transformOrigin: "300px 300px", 
                    transformBox: "view-box" 
                  }}
                  initial={isLoading ? { rotate: -40 } : undefined}
                  animate={isLoading ? { rotate: 0 } : undefined}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  id="unified-outer-rotation-group"
                >
                    {/* CURVED GRIP TYPOGRAPHY - OUTSIDE THE RING, CONCENTRIC & HUGGING THE EDGE */}
                    <motion.g
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ 
                        opacity: (!isLoading || loaderStep >= 4) ? 1 : 0, 
                        scale: (!isLoading || loaderStep >= 4) ? 1 : 0.96 
                      }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="origin-[300px_300px]"
                    >
                      <text fill="black" className="font-sans font-black text-[42px]" style={{ letterSpacing: "0.07em", wordSpacing: "0.24em" }} dy="0">
                        <textPath href="#outerTopArc" startOffset="50%" textAnchor="middle">
                          DESIGN PORTFOLIO
                        </textPath>
                      </text>
                      
                      <text fill="black" className="font-sans font-black text-[42px]" style={{ letterSpacing: "0.07em", wordSpacing: "0.24em" }} dy="0">
                        <textPath href="#outerBottomArc" startOffset="50%" textAnchor="middle">
                          FROM 2023 TO 2026
                        </textPath>
                      </text>
                    </motion.g>

                    {/* Main outer pink circle focusing ring (R=185) */}
                    <motion.circle
                      cx="300"
                      cy="300"
                      r="185"
                      fill="#ff3b8d"
                      initial={{ scale: 0 }}
                      animate={{ scale: (!isLoading || loaderStep >= 1) ? 1 : 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 28,
                        damping: 14,
                        restDelta: 0.005
                      }}
                      className="origin-[300px_300px]"
                    />

                    {/* Multiple inner concentric thin lines inside the pink circle simulating a tactile focusing grip */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: (!isLoading || loaderStep >= 3) ? 0.45 : 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <circle cx="300" cy="300" r="178" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
                      <circle cx="300" cy="300" r="172" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
                      <circle cx="300" cy="300" r="166" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
                      <circle cx="300" cy="300" r="160" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
                      <circle cx="300" cy="300" r="154" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
                      <circle cx="300" cy="300" r="148" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
                      <circle cx="300" cy="300" r="142" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
                    </motion.g>

                    {/* INNER GREY FOCUS RING COMPONENT: ROTATES AND SCALES */}
                    {/* Scale the middle grey circle up more on focus as requested */}
                    {/* 1. SCROLL-DRIVEN INNER GROUP (rotate & scale) */}
                    <motion.g
                      style={isLoading ? {
                        transformOrigin: "300px 300px",
                        transformBox: "view-box"
                      } : {
                        scale: scaleInnerGroup,
                        rotate: rotateInnerGroup,
                        transformOrigin: "300px 300px", 
                        transformBox: "view-box"
                      }}
                      id="scroll-inner-group"
                    >
                      {/* 2. LOADER-DRIVEN INNER GROUP */}
                      <motion.g
                        style={{
                          transformOrigin: "300px 300px",
                          transformBox: "view-box"
                        }}
                        animate={isLoading ? {
                          scale: loaderStep >= 2 ? 1 : 0
                        } : {
                          scale: 1
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 32,
                          damping: 15,
                          restDelta: 0.005
                        }}
                        id="loader-inner-group"
                      >
                        {/* Middle Grey Circle */}
                        <circle cx="300" cy="300" r="115" fill="#e2e2e2" />
                        <circle cx="300" cy="300" r="114" stroke="rgba(0,0,0,0.06)" strokeWidth="1" fill="none" />

                        {/* Innermost zoom group: center dot and labels scale up extra to become larger */}
                        {/* 1. SCROLL-DRIVEN INNERMOST GROUP */}
                        <motion.g
                          style={isLoading ? {
                            transformOrigin: "300px 300px",
                            transformBox: "view-box"
                          } : {
                            scale: scaleInnermost,
                            transformOrigin: "300px 300px", 
                            transformBox: "view-box"
                          }}
                          id="scroll-innermost-group"
                        >
                          {/* 2. LOADER-DRIVEN INNERMOST GROUP */}
                          <motion.g
                            style={{
                              transformOrigin: "300px 300px",
                              transformBox: "view-box"
                            }}
                            animate={isLoading ? {
                              scale: loaderStep >= 3 ? 1 : 0
                            } : {
                              scale: 1
                            }}
                            transition={{ 
                              type: "spring",
                              stiffness: 36,
                              damping: 16,
                              restDelta: 0.005
                            }}
                            id="loader-innermost-group"
                          >
                            {/* Inner top arc path for curving text inside the grey circle (R_grey=115, Path R=82) */}
                            <path 
                              id="innerTopArc" 
                              d="M 218,300 A 82,82 0 0,1 382,300" 
                              fill="none" 
                            />

                            {/* Inner Text Labels curved concentric to the inner ring - perfectly spaced 120 degrees apart with elegant smaller typography to prevent overlapping */}
                            <motion.g 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: (!isLoading || loaderStep >= 4) ? 1 : 0 }}
                              transition={{ duration: 0.8 }}
                              id="focus-labels"
                            >
                              {/* label: visual system (rotated to the top-right, ~2 o'clock) */}
                              <g transform="rotate(55 300 300)">
                                <text fill="black" className="font-sans font-black text-[13px] sm:text-[14px]" style={{ letterSpacing: "0.06em" }} dy="0">
                                  <textPath href="#innerTopArc" startOffset="50%" textAnchor="middle">
                                    visual system
                                  </textPath>
                                </text>
                              </g>
                              
                              {/* label: digital art (rotated to the top-left, ~10 o'clock) */}
                              <g transform="rotate(-65 300 300)">
                                <text fill="black" className="font-sans font-black text-[13px] sm:text-[14px]" style={{ letterSpacing: "0.06em" }} dy="0">
                                  <textPath href="#innerTopArc" startOffset="50%" textAnchor="middle">
                                    digital art
                                  </textPath>
                                </text>
                              </g>
                              
                              {/* label: future concepthu (rotated to the bottom, ~6 o'clock) */}
                              <g transform="rotate(175 300 300)">
                                <text fill="black" className="font-sans font-black text-[13px] sm:text-[14px]" style={{ letterSpacing: "0.06em" }} dy="0">
                                  <textPath href="#innerTopArc" startOffset="50%" textAnchor="middle">
                                    future concepthu
                                  </textPath>
                                </text>
                              </g>
                            </motion.g>

                            {/* Absolute Center Dot of the Focus Circle */}
                            <circle cx="300" cy="300" r="45" fill="#cccccc" />
                          </motion.g>
                        </motion.g>
                      </motion.g>
                    </motion.g>
                  </motion.g>
              </svg>
            </div>
          </div>

          {/* Progress loader text at the bottom (only visible when loading) */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0, y: 15, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
                className="absolute bottom-12 text-center text-[10px] md:text-xs font-mono font-semibold tracking-widest text-zinc-400 select-none pointer-events-none"
                id="loader-progress-text"
              >
                {lang === "EN" ? "INITIALIZING CREATIVE SYSTEM..." : "正在初始化创意系统..."}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle scroll help indicator (fades in once loading finishes) */}
          <AnimatePresence>
            {!isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.4, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 hover:opacity-100 transition-opacity z-20 pointer-events-none" 
                id="scroll-hint"
              >
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-bold">
                  {lang === "EN" ? "SCROLL DOWN TO FOCUS" : "向下滑动以对焦"}
                </span>
                <div className="w-5 h-8 border-2 border-zinc-400 rounded-full flex justify-center p-1">
                  <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 h-2 bg-zinc-500 rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT PANEL: TWO VERTICALLY STACKED BLOCKS THAT SCROLL NATIVELY */}
        <motion.div 
          initial={{ opacity: 0, width: "0%" }}
          animate={{
            opacity: isLoading ? 0 : 1,
            width: isLoading ? "0%" : (isMobile ? "100%" : "40%"),
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col bg-transparent z-10 border-t md:border-t-0 overflow-hidden shrink-0"
          id="right-details-panel"
          style={{ display: isLoading ? "none" : "flex" }}
        >
          {/* 1. TOP BLOCK: GREY BACKGROUND BLOCK (h-[50vh] or h-screen) */}
          <div
            className="w-full h-[50vh] md:h-screen bg-[#ebebeb] flex flex-col justify-end p-6 md:p-12 relative z-10"
            id="sliding-grey-block"
          >
            {/* Scroll Up Shortcut floating button (only visible when in State 2) */}
            <AnimatePresence>
              {isOverHalf && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToTop}
                  className="absolute top-24 right-6 md:right-12 p-3 rounded-full bg-white hover:bg-zinc-50 border border-zinc-300 shadow-md hover:scale-105 active:scale-95 transition-all z-30 flex items-center justify-center cursor-pointer group"
                  id="scroll-top-btn"
                  title="Scroll back up"
                >
                  <ArrowUp className="w-4 h-4 text-zinc-900 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Static title overlay inside the grey block: stays at bottom right and scrolls up naturally */}
            <div 
              className="absolute bottom-[60px] right-6 md:right-12 z-10" 
              id="xh-studio-title-box"
            >
              <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-zinc-950" id="studio-title">
                Hazel Studio
              </h1>
            </div>
          </div>

          {/* 2. BOTTOM BLOCK: SOLID TURQUOISE PANEL (h-[50vh] or h-screen) */}
          <div
            className="w-full h-[50vh] md:h-screen bg-[#00d5c3] p-8 md:p-16 flex flex-col justify-start relative shadow-[0_-8px_24px_rgba(0,0,0,0.05)] border-t border-cyan-400 z-10"
            id="sliding-turquoise-block"
          >
            {/* Main Body Text */}
            <div 
              className="mt-16 md:mt-24 text-left" 
              id="cyan-description-body"
            >
              <p 
                className="text-lg md:text-[22px] leading-relaxed font-medium text-white max-w-xl md:max-w-2xl"
                id="cyan-content-text"
                style={{ wordBreak: "keep-all" }}
              >
                {lang === "EN" ? (
                  <>
                    This compiles selected projects from my three years at university,<br className="hidden md:inline" />
                    covering creative design, layout design,<br className="hidden md:inline" />
                    and experience design.
                  </>
                ) : (
                  <>
                    这里收录的是我大学三年以来精选的项目，包括创意设计、<br />
                    编排设计，体验设计等
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>

      </div> {/* Closes section-1-wrapper */}

    {/* 3. SECTION 2: PRODUCTION PORTFOLIO GRID */}
    <div 
      ref={section2Ref}
      className="relative w-full bg-white flex flex-col pt-0 pb-16 z-20"
      id="production-portfolio-section"
    >
      {/* TICKER BANNER (CLICK, WE COMMUNICATE) WITH CONTINUOUS SEAMLESS MARQUEE SCROLL */}
      <div className="relative w-full h-12 bg-[#dedede] flex items-center overflow-hidden border-y border-zinc-200" id="ticker-banner">
        {/* Scrolling Track */}
        <div className="flex overflow-hidden select-none w-full h-full items-center relative">
          <div className="flex flex-row whitespace-nowrap" id="ticker-scroll-container">
            {/* Double identical tracks scroll in parallel to create 100% seamless loop */}
            <motion.div 
              animate={{ x: [0, "-100%"] }}
              transition={{ 
                ease: "linear", 
                duration: 25, 
                repeat: Infinity 
              }}
              className="flex flex-row shrink-0 whitespace-nowrap text-zinc-950 font-sans text-xs sm:text-sm font-black tracking-[0.25em] items-center"
            >
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
            </motion.div>

            <motion.div 
              animate={{ x: [0, "-100%"] }}
              transition={{ 
                ease: "linear", 
                duration: 25, 
                repeat: Infinity 
              }}
              className="flex flex-row shrink-0 whitespace-nowrap text-zinc-950 font-sans text-xs sm:text-sm font-black tracking-[0.25em] items-center"
            >
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
              <span className="mx-10">Click, we communicate</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Grid of the 4 Massive Interactive SD Memory Cards */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28" id="aperture-grid-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 sm:gap-28 md:gap-16 lg:gap-20 xl:gap-28 justify-items-center" id="aperture-circles-grid">
          <MemoryCard 
            id="layout-poster"
            englishLabel={["Layout & Poster"]}
            chineseLabel={lang === "EN" ? "Layout & Poster" : "编排&海报"}
            size="1GB"
            isActive={activeCardId === "layout-poster"}
            onClick={() => setActiveCardId("layout-poster")}
            index={0}
          />
          <MemoryCard 
            id="xpeng-ai-contest"
            englishLabel={["Xpeng", "AI Open Contest"]}
            chineseLabel={lang === "EN" ? "AI Open Contest" : "AI公开赛"}
            size="1GB"
            isActive={activeCardId === "xpeng-ai-contest"}
            onClick={() => setActiveCardId("xpeng-ai-contest")}
            index={1}
          />
          <MemoryCard 
            id="speculative-design"
            englishLabel={["Speculative", "Design Workshop"]}
            chineseLabel={lang === "EN" ? "Design Workshop" : "思辨设计"}
            size="1GB"
            isActive={activeCardId === "speculative-design"}
            onClick={() => setActiveCardId("speculative-design")}
            index={2}
          />
          <MemoryCard 
            id="xpeng-daily-work"
            englishLabel={["Other designs"]}
            chineseLabel={lang === "EN" ? "Other designs" : "其他设计"}
            size="2GB"
            isActive={activeCardId === "xpeng-daily-work"}
            onClick={() => setActiveCardId("xpeng-daily-work")}
            index={3}
          />
        </div>
      </div>

      {/* NEW SECTION: SEAMLESS HORIZONTAL GALLERY WITH INTERACTIVE PROGRESS SLIDER */}
      <SeamlessGallerySection lang={lang} activeCardId={activeCardId} />

      {/* NEW SECTION: PERSONAL INTRO SECTION */}
      <PersonalIntroSection lang={lang} />

      {/* FOOTER SYSTEM LABEL */}
      <footer className="w-full text-center py-8 text-[8px] sm:text-[10px] font-mono tracking-widest opacity-25 select-none" id="app-footer">
         © 2026 HAZEL STUDIO | PERFECT VECTOR FOCUS EMULATOR
      </footer>
    </div>
    </div>
    </>
  );
}

// 4. THE INTERACTIVE HIGH-FIDELITY SD MEMORY CARD COMPONENT
interface MemoryCardProps {
  id: string;
  englishLabel: string[];
  chineseLabel: string;
  size: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  targetX: number;
  targetY: number;
  duration: number;
}

function MemoryCard({ id, englishLabel, chineseLabel, size, isActive, onClick, index }: MemoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mousePosRef = useRef({ x: 120, y: 160 }); // default center reference
  const lastSpawnRef = useRef<number>(0);

  // Function to spawn a beautiful flat square pixel particle at the designated spot
  const spawnParticleAt = (x: number, y: number) => {
    const size = Math.random() * 8 + 6; // 6px to 14px sharp pixel size
    // Generously spread positions around the cursor to cover the cursor circle fully
    const offsetX = Math.random() * 60 - 30; // 60px diameter cursor circle coverage
    const offsetY = Math.random() * 60 - 30;
    
    const newParticle: Particle = {
      id: `${Date.now()}-${Math.random()}`,
      x: x + offsetX,
      y: y + offsetY,
      size,
      targetX: Math.random() * 110 - 55, // wider beautiful scatter
      targetY: -(Math.random() * 110 + 70), // float upwards
      duration: Math.random() * 0.5 + 0.5, // snappy, interactive life time
    };

    setParticles((prev) => [...prev, newParticle].slice(-45)); // limit max concurrent particles for performance
  };

  // Handle capturing mouse coordinates relative to the card container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };

    // Highly responsive spawn trail on cursor motion with slight throttling (approx 30ms gap)
    const now = Date.now();
    if (now - lastSpawnRef.current > 30) {
      spawnParticleAt(x, y);
      lastSpawnRef.current = now;
    }
  };

  // Continuous loop emitting particles when hovered even if mouse remains static
  useEffect(() => {
    if (!isHovered) {
      setParticles([]); // instantly clear when mouse leaves
      return;
    }

    const interval = setInterval(() => {
      // Spawn 1-2 particles at the current hovered cursor ref position
      spawnParticleAt(mousePosRef.current.x, mousePosRef.current.y);
      if (Math.random() > 0.4) {
        spawnParticleAt(mousePosRef.current.x, mousePosRef.current.y);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-4 relative" 
      id={`card-outer-container-${id}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], 
        delay: index * 0.12 
      }}
    >
      <motion.div
        className="relative w-[240px] h-[320px] cursor-pointer select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setParticles([]); // ensure instant complete clearance of particles on leave
        }}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        animate={{
          rotate: isActive || isHovered ? -7 : 0,
          scale: isActive || isHovered ? 1.04 : 1,
          y: isActive ? -16 : isHovered ? -6 : 0,
        }}
        style={{
          boxShadow: "none",
          borderRadius: "16px"
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 14,
        }}
        id={`memory-card-${id}`}
      >
        {/* Particle System releasing pixel squares right under the cursor light circle */}
        {isHovered && particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-[#ff3b8d] pointer-events-none z-50"
            style={{
              width: p.size,
              height: p.size,
              left: p.x,
              top: p.y,
            }}
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={{
              x: p.targetX,
              y: p.targetY,
              scale: [1, 1, 0], // completely flat square, stays 1, then disappears at the last frame
            }}
            transition={{
              duration: p.duration,
              ease: "easeOut",
              times: [0, 0.85, 1], // absolute flat, sharp square feel, no fade-in/fade-out
            }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
            id={`particle-${id}-${p.id}`}
          />
        ))}

        {/* SD Card Body SVG Background */}
        <svg 
          viewBox="0 0 240 320" 
          className="absolute inset-0 w-full h-full drop-shadow-md overflow-visible"
          id={`sd-body-svg-${id}`}
        >
          {/* Card main path with chamfered top-right corner and left protect-switch notch */}
          <motion.path 
            d="M 0,0 L 180,0 L 240,60 L 240,320 L 0,320 L 0,150 L 6,150 L 6,110 L 0,110 Z" 
            animate={{ 
              fill: isActive || isHovered ? "#919191" : "#c2c2c2" 
            }}
            transition={{ duration: 0.25 }}
            id={`sd-path-${id}`}
          />
        </svg>

        {/* Dynamic Write-Protect Switch in notch */}
        <div 
          className="absolute left-[1px] w-[5px] h-[16px] bg-[#686868] rounded-sm shadow-inner transition-all duration-300"
          style={{ 
            top: isActive || isHovered ? "116px" : "130px",
            backgroundColor: isActive || isHovered ? "#4a4a4a" : "#7d7d7d"
          }}
          id={`sd-switch-${id}`}
        />

        {/* Inner Rounded Label (White Area) */}
        <div 
          className="absolute top-[52px] left-[16px] right-[16px] bottom-[16px] bg-white rounded-2xl flex flex-col justify-between items-center p-5 pt-7 select-none shadow-sm"
          id={`sd-inner-label-${id}`}
        >
          {/* Top bold Chinese title */}
          <h3 
            className="text-[25px] font-sans font-black tracking-tight text-center leading-none select-none transition-colors duration-300"
            style={{ color: isActive || isHovered ? "#ff3b8d" : "#00d5c3" }}
            id={`sd-cn-title-${id}`}
          >
            {chineseLabel}
          </h3>

          {/* Left Lock Switch Text Label */}
          <div 
            className="absolute left-[13px] top-[102px] -rotate-90 origin-left flex items-center gap-1 select-none text-zinc-400 font-sans font-extrabold text-[9px] tracking-widest"
            id={`sd-lock-text-${id}`}
          >
            <span>◀</span>
            <span>LOCK</span>
          </div>

          {/* Middle bold English text blocks */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-1 py-3" id={`sd-en-container-${id}`}>
            {englishLabel.map((line, idx) => (
              <div 
                key={idx} 
                className="text-[17px] font-sans font-extrabold text-zinc-900 leading-[1.2] tracking-tight"
                id={`sd-en-line-${id}-${idx}`}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Bottom left small metal pad contact connector */}
          <div 
            className="absolute left-[20px] bottom-[20px] w-[14px] h-[14px] rounded-[2px] transition-colors duration-300" 
            style={{ backgroundColor: isActive || isHovered ? "#6b7280" : "#a1a1a1" }}
            id={`sd-connector-${id}`}
          />

          {/* Bottom right bold size label */}
          <div 
            className="absolute right-[20px] bottom-[16px] font-sans font-black text-zinc-950 flex items-baseline leading-none select-none"
            id={`sd-size-${id}`}
          >
            <span className="text-[34px] tracking-tighter">{size ? size.charAt(0) : "1"}</span>
            <span className="text-[16px] font-bold ml-0.5">{size ? size.substring(1) : "GB"}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
