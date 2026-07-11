import React, { useState, useEffect, useRef } from "react";

interface ShowcasePanelProps {
  fileName: string;
  titleZH: string;
  titleEN: string;
  descZH: string;
  descEN: string;
}

function ShowcasePanel({ fileName, titleZH, titleEN, descZH, descEN }: ShowcasePanelProps) {
  const [imgSrc, setImgSrc] = useState<string>(`/公共/${fileName}.png`);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    setImgSrc(`/公共/${fileName}.png`);
    setRetryCount(0);
  }, [fileName]);

  const handleImageError = () => {
    if (retryCount === 0) {
      setImgSrc(`/公共/${fileName}.jpg`);
      setRetryCount(1);
    } else if (retryCount === 1) {
      setImgSrc(`/公共/${fileName}.jpeg`);
      setRetryCount(2);
    } else if (retryCount === 2) {
      setImgSrc(`/公共/${fileName}.webp`);
      setRetryCount(3);
    } else if (retryCount === 3) {
      setImgSrc(`/${fileName}.png`);
      setRetryCount(4);
    } else if (retryCount === 4) {
      setImgSrc(`/${fileName}.jpg`);
      setRetryCount(5);
    } else if (retryCount === 5) {
      setImgSrc(`/${fileName}.jpeg`);
      setRetryCount(6);
    } else if (retryCount === 6) {
      setImgSrc(`/${fileName}.webp`);
      setRetryCount(7);
    }
  };

  // Keep references to other properties to avoid any build warnings
  const altText = `${titleZH} - ${titleEN} - ${descZH} - ${descEN}`;

  return (
    <div 
      className="h-full shrink-0 flex items-center justify-start select-none py-0"
      id={`showcase-container-${fileName}`}
    >
      <img 
        src={imgSrc} 
        alt={altText}
        onError={handleImageError}
        className="h-[700px] w-auto max-w-none object-contain rounded-none shadow-none transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

interface SeamlessGallerySectionProps {
  lang: "EN" | "ZH";
  activeCardId: string;
}

export default function SeamlessGallerySection({ lang, activeCardId }: SeamlessGallerySectionProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Reset progress and scroll when active card tab changes
  useEffect(() => {
    setProgress(0);
    if (galleryRef.current) {
      galleryRef.current.scrollLeft = 0;
    }
  }, [activeCardId]);

  // Update scroll progress and synchronize to the gallery
  const updateProgress = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newProgress = Math.min(1, Math.max(0, x / rect.width));
    setProgress(newProgress);

    // Sync to horizontal scroll of the gallery below
    if (galleryRef.current) {
      const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth;
      galleryRef.current.scrollLeft = newProgress * maxScroll;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateProgress(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      updateProgress(e.touches[0].clientX);
    }
  };

  // Bidirectional binding: when scrolling the gallery, update the progress bar
  const handleGalleryScroll = () => {
    if (isDragging) return; // Prevent loop during manual drag
    if (!galleryRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    setProgress(scrollLeft / maxScroll);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateProgress(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        updateProgress(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  // Define Footer Titles for the four pages
  const getFooterTitle = () => {
    switch (activeCardId) {
      case "layout-poster":
        return lang === "EN" ? "Layout Design · Poster Design" : "编排设计 · 海报设计";
      case "xpeng-ai-contest":
        return lang === "EN" ? "Marketing Design · Poster Design · Operations" : "营销设计 · 海报设计 · 运营设计";
      case "speculative-design":
        return lang === "EN" ? "Speculative Design · Poster Design" : "思辨设计 · 海报设计";
      case "xpeng-daily-work":
        return lang === "EN" ? "UI/UX Design · Experience Design" : "UI设计 · 体验设计";
      default:
        return lang === "EN" ? "Layout Design · Poster Design" : "编排设计 · 海报设计";
    }
  };

  return (
    <div className="relative w-full bg-white flex flex-col pt-0 pb-12 overflow-hidden border-t border-zinc-200" id="seamless-gallery-page">
      
      {/* 1. SLIDER PROGRESS BAR (Drag horizontally or swipe on trackpad to scroll) */}
      <div 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative w-full h-20 bg-[#ff3b8d] cursor-pointer overflow-hidden select-none mb-0 shadow-inner"
        id="seamless-slider-track"
      >
        {/* Gray curtain/handle starting from current progress and extending to the right */}
        <div 
          className="absolute top-0 bottom-0 right-0 bg-[#dbdbdb] flex items-center border-l border-white/20"
          style={{ 
            left: `${progress * 100}%`,
            transition: isDragging ? "none" : "left 150ms ease-out"
          }}
          id="seamless-slider-curtain"
        >
          {/* Slider drag label: Play Button + Text */}
          <div className="flex items-center gap-4 pl-8 select-none whitespace-nowrap text-white" id="seamless-slider-label">
            {/* White Play Triangle */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white stroke-none" id="slider-play-icon">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="font-sans font-bold text-base sm:text-lg tracking-widest text-white">
              {lang === "EN" ? "SLIDE RIGHT TO SEE MORE" : "向右滑动 查看更多"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. HORIZONTAL SEAMLESS GALLERY */}
      <div 
        ref={galleryRef}
        onScroll={handleGalleryScroll}
        className="w-full h-[700px] overflow-x-auto flex flex-row items-center gap-0 select-none scrollbar-none pl-0 pr-0"
        id="seamless-gallery-viewport"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div style={{ display: activeCardId === "layout-poster" ? "block" : "none" }}>
          <ShowcasePanel
            fileName="编排海报设计"
            titleZH="编排与海报设计展示"
            titleEN="Layout & Poster Design Showcase"
            descZH="海报排版视觉传达：对日常设计的实验性探索与实体作品排版。"
            descEN="Visual layout experiments, editorial structures, and high-fidelity poster graphics."
          />
        </div>
        <div style={{ display: activeCardId === "xpeng-ai-contest" ? "block" : "none" }}>
          <ShowcasePanel
            fileName="ai公开赛"
            titleZH="小鹏AI公开赛作品展示"
            titleEN="XPeng AI Open Contest Showcase"
            descZH="AIGC与智驾概念融合：利用生成式设计 and 矢量排版，重构科幻风格商业化视觉。"
            descEN="Futuristic neon grids, customized generative assets, and transparent UI cards."
          />
        </div>
        <div style={{ display: activeCardId === "speculative-design" ? "block" : "none" }}>
          <ShowcasePanel
            fileName="思辨设计"
            titleZH="地衣纪元思辨设计展示"
            titleEN="The Lichens Era Speculative Design Showcase"
            descZH="地衣生态微藻共生：以黑白像素、拓印文献，探索极端气候灾变下的未来系统。"
            descEN="Symbiotic ecosystems, micro-layout grids, biological textures, and clinical maps."
          />
        </div>
        <div style={{ display: activeCardId === "xpeng-daily-work" ? "block" : "none" }}>
          <ShowcasePanel
            fileName="其他设计"
            titleZH="其他设计作品展示"
            titleEN="Other Designs Showcase"
            descZH="智能座舱经典游戏界面：融汇古籍、水墨、触控反馈，打磨高水准华夏传统细节设计。"
            descEN="Smart HMI custom interfaces, ancient scroll themes, and physical collectible cards."
          />
        </div>
      </div>

      {/* 3. FOOTER LABEL SECTION HEADER (■ 编排设计 · 海报设计) */}
      <div className="w-full px-6 md:px-12 mt-8 flex items-center gap-4" id="seamless-gallery-footer">
        {/* Dark square bullet */}
        <div className="w-5 h-5 bg-[#333333] shrink-0" id="footer-square-bullet" />
        <h2 className="text-xl sm:text-2xl font-sans font-black tracking-wide text-zinc-900" id="footer-main-title">
          {getFooterTitle()}
        </h2>
      </div>

    </div>
  );
}
