import React from "react";

interface PersonalIntroSectionProps {
  lang?: "EN" | "ZH";
}

export function PersonalIntroSection({ lang = "ZH" }: PersonalIntroSectionProps) {
  // Use the newly uploaded personal photo for the portrait
  const portraitUrl = "/showcase/b8ea99c7fef30531f5ed178f3606a0cf 2.png";

  return (
    <div className="w-full bg-white select-none flex flex-col font-sans animate-fade-in" id="personal-intro-section">
      
      {/* 1. White Background Section - Perfect Split-Screen alignment matching the design guidelines */}
      <div className="w-full px-6 md:px-12 py-16 md:py-24" id="intro-grid-container">
        
        {/* DESKTOP GRID LAYOUT: Strict layout aligned perfectly with the 60%/40% split boundary on the homepage */}
        <div className="hidden md:grid grid-cols-[calc(60vw-48px)_1fr] gap-x-0 items-stretch" id="about-desktop-grid">
          
          {/* Left Column: Contains Portrait, Personal Info, and Contact in a vertical flexbox that stretches to full height */}
          <div className="flex flex-col justify-between text-left h-full" id="desktop-left-column">
            
            {/* 1. Portrait (Top aligned) */}
            <div 
              className="w-[110px] h-[145px] overflow-hidden bg-neutral-100 shadow-xs" 
              id="desktop-portrait-box"
            >
              <img 
                src={portraitUrl} 
                alt="黄兴华" 
                className="w-full h-full object-cover grayscale contrast-[1.25] brightness-[0.93]"
                referrerPolicy="no-referrer"
                id="desktop-portrait-img"
              />
            </div>

            {/* 2. Personal Info (Middle) */}
            <div className="flex flex-col text-left py-8" id="desktop-info-block">
              <span className="text-black text-[12px] font-bold uppercase tracking-[0.2em] mb-4 block" id="desktop-info-title">
                {lang === "EN" ? "PERSONAL INFO" : "个人信息"}
              </span>
              <div className="space-y-1.5 text-black text-[14px] font-bold leading-relaxed" id="desktop-info-content">
                {lang === "EN" ? (
                  <>
                    <p className="tracking-wide">Xinghua Huang / Class of 2027</p>
                    <p className="tracking-wide">Guangzhou Academy of Fine Arts / Art & Technology</p>
                  </>
                ) : (
                  <>
                    <p className="tracking-wide">黄兴华/27届</p>
                    <p className="tracking-wide">广州美术学院/艺术与科技专业</p>
                  </>
                )}
              </div>
            </div>

            {/* 3. Contact (Bottom aligned) */}
            <div className="flex flex-col text-left" id="desktop-contact-block">
              <span className="text-black text-[12px] font-bold uppercase tracking-[0.2em] mb-4 block" id="desktop-contact-title">
                {lang === "EN" ? "CONTACT" : "联系方式"}
              </span>
              <div className="space-y-1.5 text-black text-[14px] font-bold leading-relaxed" id="desktop-contact-content">
                <p className="tracking-wide">1402800576@qq.com</p>
                <p className="tracking-wide">17827080274（wechat）</p>
              </div>
            </div>

          </div>

          {/* Right Column: Contains Awards (Top) and Campus Experience (Bottom) */}
          <div className="flex flex-col justify-between text-left h-full" id="desktop-right-column">
            
            {/* 1. Awards (Top aligned) */}
            <div className="flex flex-col text-left pb-8" id="desktop-awards-block">
              <span className="text-black text-[12px] font-bold uppercase tracking-[0.2em] mb-4 block" id="desktop-awards-title">
                {lang === "EN" ? "AWARDS" : "获奖经历"}
              </span>
              <div className="space-y-1.5 text-black text-[14px] font-bold leading-relaxed" id="desktop-awards-content">
                {lang === "EN" ? (
                  <>
                    <p className="tracking-wide">2025 Shenzhen Global Design Award "Kunpeng Award" Future Award</p>
                    <p className="tracking-wide">2025 Kan Tai-keung Design Award National Student Group Excellence Award</p>
                    <p className="tracking-wide">2025 Kan Tai-keung Design Award South China Division Gold Award</p>
                    <p className="tracking-wide">2025 China Star Design Award Excellence Award</p>
                  </>
                ) : (
                  <>
                    <p className="tracking-wide">2025深圳环球设计大奖 “鲲鹏奖” 未来奖</p>
                    <p className="tracking-wide">2025靳埭强设计奖全国学生组优秀奖</p>
                    <p className="tracking-wide">2025靳埭强设计奖华南赛区金奖</p>
                    <p className="tracking-wide">2025中国之星设计奖优秀奖</p>
                  </>
                )}
              </div>
            </div>

            {/* 2. Campus Experience (Bottom aligned) */}
            <div className="flex flex-col text-left" id="desktop-campus-block">
              <span className="text-black text-[12px] font-bold uppercase tracking-[0.2em] mb-4 block" id="desktop-campus-title">
                {lang === "EN" ? "CAMPUS EXPERIENCE" : "校内经历"}
              </span>
              <div className="space-y-1.5 text-black text-[14px] font-bold leading-relaxed" id="desktop-campus-content">
                {lang === "EN" ? (
                  <>
                    <p className="tracking-wide">2024-2025 Top 100 Student Leader</p>
                    <p className="tracking-wide">2024-2025 Top 10 Psychological Counselor</p>
                    <p className="tracking-wide">2024-2025 Campus Organization Outstanding Director</p>
                    <p className="tracking-wide">2023-2024 Campus Organization Outstanding Member</p>
                    <p className="tracking-wide">2023-2024 National Encouragement Scholarship</p>
                    <p className="tracking-wide">2024-2025 National Encouragement Scholarship</p>
                    <p className="tracking-wide">2023-2024 Hong Kong Shin Sen Scholarship</p>
                  </>
                ) : (
                  <>
                    <p className="tracking-wide">2024-2025百优学生骨干</p>
                    <p className="tracking-wide">2024-2025十佳心理委员</p>
                    <p className="tracking-wide">2024-2025校级组织优秀部长</p>
                    <p className="tracking-wide">2023-2024校级组织优秀部员</p>
                    <p className="tracking-wide">2023-2024国家励志奖学金</p>
                    <p className="tracking-wide">2024-2025国家励志奖学金</p>
                    <p className="tracking-wide">2023-2024香港信善奖学金</p>
                  </>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* MOBILE LAYOUT: Clean stacked list for smaller screens */}
        <div className="block md:hidden flex flex-col space-y-12" id="about-mobile-grid">
          {/* Portrait Box */}
          <div className="flex flex-col items-start" id="mobile-portrait-section">
            <div 
              className="w-[110px] h-[145px] overflow-hidden bg-neutral-100 shadow-xs" 
              id="mobile-portrait-box"
            >
              <img 
                src={portraitUrl} 
                alt="黄兴华" 
                className="w-full h-full object-cover grayscale contrast-[1.25] brightness-[0.93]"
                referrerPolicy="no-referrer"
                id="mobile-portrait-img"
              />
            </div>
          </div>

          {/* 个人信息 */}
          <div className="flex flex-col text-left" id="mobile-info-section">
            <span className="text-black text-[12px] font-bold uppercase tracking-[0.2em] mb-3 block" id="mobile-info-title">
              {lang === "EN" ? "PERSONAL INFO" : "个人信息"}
            </span>
            <div className="space-y-1.5 text-black text-[14px] font-bold leading-relaxed">
              {lang === "EN" ? (
                <>
                  <p className="tracking-wide">Xinghua Huang / Class of 2027</p>
                  <p className="tracking-wide">Guangzhou Academy of Fine Arts / Art & Technology</p>
                </>
              ) : (
                <>
                  <p className="tracking-wide">黄兴华/27届</p>
                  <p className="tracking-wide">广州美术学院/艺术与科技专业</p>
                </>
              )}
            </div>
          </div>

          {/* 联系方式 */}
          <div className="flex flex-col text-left" id="mobile-contact-section">
            <span className="text-black text-[12px] font-bold uppercase tracking-[0.2em] mb-3 block" id="mobile-contact-title">
              {lang === "EN" ? "CONTACT" : "联系方式"}
            </span>
            <div className="space-y-1.5 text-black text-[14px] font-bold leading-relaxed">
              <p className="tracking-wide">1402800576@qq.com</p>
              <p className="tracking-wide">17827080274（wechat）</p>
            </div>
          </div>

          {/* 获奖经历 */}
          <div className="flex flex-col text-left" id="mobile-awards-section">
            <span className="text-black text-[12px] font-bold uppercase tracking-[0.2em] mb-3 block" id="mobile-awards-title">
              {lang === "EN" ? "AWARDS" : "获奖经历"}
            </span>
            <div className="space-y-1.5 text-black text-[14px] font-bold leading-relaxed">
              {lang === "EN" ? (
                <>
                  <p className="tracking-wide">2025 Shenzhen Global Design Award "Kunpeng Award" Future Award</p>
                  <p className="tracking-wide">2025 Kan Tai-keung Design Award National Student Group Excellence Award</p>
                  <p className="tracking-wide">2025 Kan Tai-keung Design Award South China Division Gold Award</p>
                  <p className="tracking-wide">2025 China Star Design Award Excellence Award</p>
                </>
              ) : (
                <>
                  <p className="tracking-wide">2025深圳环球设计大奖 “鲲鹏奖” 未来奖</p>
                  <p className="tracking-wide">2025靳埭强设计奖全国学生组优秀奖</p>
                  <p className="tracking-wide">2025靳埭强设计奖华南赛区金奖</p>
                  <p className="tracking-wide">2025中国之星设计奖优秀奖</p>
                </>
              )}
            </div>
          </div>

          {/* 校内经历 */}
          <div className="flex flex-col text-left" id="mobile-campus-section">
            <span className="text-black text-[12px] font-bold uppercase tracking-[0.2em] mb-3 block" id="mobile-campus-title">
              {lang === "EN" ? "CAMPUS EXPERIENCE" : "校内经历"}
            </span>
            <div className="space-y-1.5 text-black text-[14px] font-bold leading-relaxed">
              {lang === "EN" ? (
                <>
                  <p className="tracking-wide">2024-2025 Top 100 Student Leader</p>
                  <p className="tracking-wide">2024-2025 Top 10 Psychological Counselor</p>
                  <p className="tracking-wide">2024-2025 Campus Organization Outstanding Director</p>
                  <p className="tracking-wide">2023-2024 Campus Organization Outstanding Member</p>
                  <p className="tracking-wide">2023-2024 National Encouragement Scholarship</p>
                  <p className="tracking-wide">2024-2025 National Encouragement Scholarship</p>
                  <p className="tracking-wide">2023-2024 Hong Kong Shin Sen Scholarship</p>
                </>
              ) : (
                <>
                  <p className="tracking-wide">2024-2025百优学生骨干</p>
                  <p className="tracking-wide">2024-2025十佳心理委员</p>
                  <p className="tracking-wide">2024-2025校级组织优秀部长</p>
                  <p className="tracking-wide">2023-2024校级组织优秀部员</p>
                  <p className="tracking-wide">2023-2024国家励志奖学金</p>
                  <p className="tracking-wide">2024-2025国家励志奖学金</p>
                  <p className="tracking-wide">2023-2024香港信善奖学金</p>
                </>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 2. Turquoise Banner Section - High Fidelity 4-Column Layout */}
      <div className="w-full bg-[#28ccbe] pt-20 md:pt-24 pb-12 md:pb-20 overflow-visible relative" id="intro-cyan-banner">
        <div className="w-full px-6 md:px-12" id="banner-container">
          
          {/* DESKTOP CONTENT COLUMNS: Four columns centered and aligned with webpage left and right margins */}
          <div className="hidden md:grid grid-cols-4 gap-x-8 w-full relative z-10 text-center" id="banner-grid-desktop">
            {/* Col 1: 求职城市 */}
            <div className="flex flex-col items-center text-center px-4" id="banner-col-1">
              <span className="text-white text-xs sm:text-[13px] font-bold tracking-[0.2em] mb-2.5 opacity-85" id="banner-label-1">
                {lang === "EN" ? "JOB LOCATION" : "求职城市"}
              </span>
              <span className="text-white text-[15px] sm:text-lg md:text-[19px] font-extrabold tracking-wide" id="banner-val-1">
                {lang === "EN" ? "Guangzhou/Shenzhen/Hangzhou" : "广州/深圳/杭州"}
              </span>
            </div>

            {/* Col 2: 意向岗位 */}
            <div className="flex flex-col items-center text-center px-4" id="banner-col-2">
              <span className="text-white text-xs sm:text-[13px] font-bold tracking-[0.2em] mb-2.5 opacity-85" id="banner-label-2">
                {lang === "EN" ? "INTENDED ROLE" : "意向岗位"}
              </span>
              <span className="text-white text-[15px] sm:text-lg md:text-[19px] font-extrabold tracking-wide" id="banner-val-2">
                {lang === "EN" ? "Creative/Experience Design" : "创意设计/体验设计"}
              </span>
            </div>

            {/* Col 3: 社交账号 */}
            <div className="flex flex-col items-center text-center px-4" id="banner-col-3">
              <span className="text-white text-xs sm:text-[13px] font-bold tracking-[0.2em] mb-2.5 opacity-85" id="banner-label-3">
                {lang === "EN" ? "SOCIAL MEDIA" : "社交账号"}
              </span>
              <span className="text-white text-[15px] sm:text-lg md:text-[19px] font-extrabold tracking-wide" id="banner-val-3">
                {lang === "EN" ? "Xiaohongshu" : "小红书"}
              </span>
            </div>

            {/* Col 4: 期待 */}
            <div className="flex flex-col items-center text-center px-4" id="banner-col-4">
              <span className="text-white text-xs sm:text-[13px] font-bold tracking-[0.2em] mb-2.5 opacity-85" id="banner-label-4">
                {lang === "EN" ? "EXPECTATION" : "期待"}
              </span>
              <span className="text-white text-[15px] sm:text-lg md:text-[19px] font-extrabold tracking-wide" id="banner-val-4">
                {lang === "EN" ? "Your Contact" : "你的联系"}
              </span>
            </div>
          </div>

          {/* MOBILE CONTENT COLUMNS: Clean centered responsive grid */}
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 text-center relative z-10 md:hidden" id="banner-grid-mobile">
            {/* Col 1 */}
            <div className="flex flex-col items-center text-center" id="banner-col-1-mobile">
              <span className="text-white text-xs font-bold tracking-[0.2em] mb-2 opacity-85">
                {lang === "EN" ? "JOB LOCATION" : "求职城市"}
              </span>
              <span className="text-white text-base font-extrabold tracking-wide">
                {lang === "EN" ? "Guangzhou/Shenzhen/Hangzhou" : "广州/深圳/杭州"}
              </span>
            </div>
            {/* Col 2 */}
            <div className="flex flex-col items-center text-center" id="banner-col-2-mobile">
              <span className="text-white text-xs font-bold tracking-[0.2em] mb-2 opacity-85">
                {lang === "EN" ? "INTENDED ROLE" : "意向岗位"}
              </span>
              <span className="text-white text-base font-extrabold tracking-wide">
                {lang === "EN" ? "Creative/Experience Design" : "创意设计/体验设计"}
              </span>
            </div>
            {/* Col 3 */}
            <div className="flex flex-col items-center text-center" id="banner-col-3-mobile">
              <span className="text-white text-xs font-bold tracking-[0.2em] mb-2 opacity-85">
                {lang === "EN" ? "SOCIAL MEDIA" : "社交账号"}
              </span>
              <span className="text-white text-base font-extrabold tracking-wide">
                {lang === "EN" ? "Xiaohongshu" : "小红书"}
              </span>
            </div>
            {/* Col 4 */}
            <div className="flex flex-col items-center text-center" id="banner-col-4-mobile">
              <span className="text-white text-xs font-bold tracking-[0.2em] mb-2 opacity-85">
                {lang === "EN" ? "EXPECTATION" : "期待"}
              </span>
              <span className="text-white text-base font-extrabold tracking-wide">
                {lang === "EN" ? "Your Contact" : "你的联系"}
              </span>
            </div>
          </div>

          {/* Giant "Hazel Studio" Background Text: Perfectly Centered, Aligned left and right, and fully visible without any truncation */}
          <div className="w-full mt-24 md:mt-32 select-none pointer-events-none text-center relative z-10" id="giant-text-container">
            <h1 className="text-white font-sans font-black text-[12vw] sm:text-[13vw] md:text-[14vw] tracking-tighter leading-none text-center" id="giant-hazel-studio">
              Hazel Studio
            </h1>
          </div>

        </div>
      </div>
    </div>
  );
}
