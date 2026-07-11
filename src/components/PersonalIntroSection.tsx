import React from "react";

export function PersonalIntroSection() {
  return (
    <div className="w-full bg-white select-none flex flex-col font-sans" id="personal-intro-section">
      {/* 1. White Background Section (Contact & Email) */}
      <div className="w-full bg-white pt-24 pb-20 px-6 md:px-12 flex flex-col" id="intro-contact-top">
        {/* Paragraph text */}
        <div className="text-left" id="intro-paragraph-box">
          <p className="text-black font-bold text-[14px] sm:text-[15px] md:text-[16px] leading-[1.4] tracking-wider" id="intro-paragraph-line1">
            我总是在寻找新的挑战。
          </p>
          <p className="text-black font-bold text-[14px] sm:text-[15px] md:text-[16px] leading-[1.4] tracking-wider mt-1" id="intro-paragraph-line2">
            如需信息、新项目或合作，欢迎随时联系我。
          </p>
        </div>

        {/* Large email */}
        <div className="text-left mt-24 md:mt-32" id="intro-email-box">
          <span 
            className="text-black font-black text-2xl sm:text-3xl md:text-[38px] tracking-tight block"
            id="intro-email-text"
          >
            1402800576@qq.com
          </span>
        </div>
      </div>

      {/* 2. Turquoise Background Section (Job Details & Giant Brand name) */}
      <div className="w-full bg-[#29ccbe] pt-20 pb-0 px-0 flex flex-col justify-between overflow-hidden" id="intro-cyan-bottom">
        
        {/* 4 columns layout: stretched to the absolute left and right of the padding */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-y-12 gap-x-6 text-left mb-24 md:mb-32 px-6 md:px-12" id="intro-details-grid">
          {/* Column 1 */}
          <div className="flex flex-col" id="intro-col-1">
            <span className="text-white text-[13px] sm:text-[14px] font-bold tracking-wider mb-2 opacity-90" id="intro-label-1">
              求职城市
            </span>
            <span className="text-white text-[15px] sm:text-[16px] md:text-[17px] font-bold tracking-wider" id="intro-val-1">
              广州/深圳/杭州
            </span>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col" id="intro-col-2">
            <span className="text-white text-[13px] sm:text-[14px] font-bold tracking-wider mb-2 opacity-90" id="intro-label-2">
              意向岗位
            </span>
            <span className="text-white text-[15px] sm:text-[16px] md:text-[17px] font-bold tracking-wider" id="intro-val-2">
              创意设计/体验设计
            </span>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col" id="intro-col-3">
            <span className="text-white text-[13px] sm:text-[14px] font-bold tracking-wider mb-2 opacity-90" id="intro-label-3">
              期待
            </span>
            <span className="text-white text-[15px] sm:text-[16px] md:text-[17px] font-bold tracking-wider" id="intro-val-3">
              你的联系
            </span>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col" id="intro-col-4">
            <span className="text-white text-[13px] sm:text-[14px] font-bold tracking-wider mb-2 opacity-90" id="intro-label-4">
              联系我
            </span>
            <span className="text-white text-[15px] sm:text-[16px] md:text-[17px] font-bold tracking-wider" id="intro-val-4">
              电话：17827080274
            </span>
          </div>
        </div>

        {/* Giant Xh Studio Brand logo text at the bottom: perfectly aligned with left & right margins of upper text, without stretching */}
        <div className="w-full mt-auto overflow-hidden px-6 md:px-12 pb-12 sm:pb-16 md:pb-24 text-center" id="intro-brand-box">
          <h2 
            className="text-white font-sans font-black text-[15.8vw] sm:text-[15.4vw] md:text-[15.2vw] leading-none tracking-[-0.05em] select-none text-center whitespace-nowrap w-full" 
            id="intro-brand-title"
          >
            Xh Studio
          </h2>
        </div>

      </div>
    </div>
  );
}
