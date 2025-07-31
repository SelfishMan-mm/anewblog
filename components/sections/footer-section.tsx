'use client';

import { BoxReveal } from "@/components/magicui/box-reveal";
import { mockSiteData } from "@/config/mock-data";

export function FooterSection() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 mt-20">
      <BoxReveal boxColor="#3b82f6" duration={0.5}>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            {mockSiteData.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:scale-125 transition-transform duration-300"
              >
                <img src={link.icon} alt={link.platform} className="w-7 h-7 rounded-full shadow-md group-hover:ring-2 group-hover:ring-primary group-hover:bg-primary/10 transition-all duration-300" />
              </a>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>© {currentYear} {mockSiteData.personal.name}. All rights reserved.</p>
            <p className="mt-2">Made with 💻 in Suzhou</p>
          </div>
        </div>
      </BoxReveal>
    </footer>
  );
}
