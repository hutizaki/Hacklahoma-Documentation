import React, { type ReactNode } from 'react';

interface BrowserWindowProps {
  children: ReactNode;
  url?: string;
}

export default function BrowserWindow({
  children,
  url = 'http://localhost:3000'
}: BrowserWindowProps): React.ReactElement {
  return (
    <div className="border-[3px] border-solid border-[var(--ifm-color-emphasis-200)] rounded-[0.5rem] overflow-hidden mb-[var(--ifm-leading)]">
      {/* Browser Header */}
      <div className="flex items-center bg-[var(--ifm-color-emphasis-200)] px-[1rem] py-[0.5rem]">
        
        {/* Traffic light buttons */}
        <div className="button-group whitespace-nowrap display-block gap-0">
          <span className="dot_1 w-[12px] h-[12px] mr-[6px] rounded-full bg-[#f25f58]"></span>
          <span className="dot_2 w-[12px] h-[12px] mr-[6px] rounded-full bg-[#fbbe3c]"></span>
          <span className="dot_3 w-[12px] h-[12px] mr-[6px] rounded-full bg-[#58cb42]"></span>
        </div>

        {/* Address Bar */}
        <div className="flex-1 px-[15px] py-[5px]" 
          style={{ 
            backgroundColor: 'var(--ifm-background-color)',
            borderRadius: '12.5px',
            font: '400 13px Arial, sans-serif',
            margin: '0 1rem 0 0.5rem'
          }}>
          {url}
        </div>

        {/* Hamburger Menu Icon (for demo purposes) */}
        <div className="flex flex-col gap-[3px] ml-auto">
          <div className="w-[17px] h-[3px] bg-[#aaa] rounded-sm"></div>
          <div className="w-[17px] h-[3px] bg-[#aaa] rounded-sm"></div>
          <div className="w-[17px] h-[3px] bg-[#aaa] rounded-sm"></div>
        </div>
      </div>
      
      {/* Browser Content */}
      <div className="p-5 bg-[var(--ifm-background-color)] [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}