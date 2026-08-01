import React from "react";
import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react";
import { getEmailLink } from "./utils";

const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-white dark:bg-[#09090b] border-t theme-border pt-16 pb-8 overflow-hidden z-10 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 border-b theme-border pb-12">
          
          {/* Logo & Description */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#home" onClick={scrollToTop} className="text-3xl font-black tracking-tighter text-white hover:text-[color:var(--page-primary)] transition-colors mb-4 inline-flex items-center gap-1 cursor-pointer">
              <span className="text-[color:var(--page-primary)]">.</span>JN
            </a>
            <p className="text-white/80 max-w-sm mb-6 leading-relaxed">
              Building secure, scalable, and high-performance web applications with a focus on modern backend architecture.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/JeetNathwani26" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full theme-surface-strong theme-border border text-[color:var(--page-muted)] hover:text-[color:var(--page-primary)] hover:border-[color:var(--page-primary)] transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/jeet-nathwani-274a06271/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full theme-surface-strong theme-border border text-[color:var(--page-muted)] hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2.5 rounded-full theme-surface-strong theme-border border text-[color:var(--page-muted)] hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors">
                <Twitter size={20} />
              </a>
              <a href={getEmailLink()} className="p-2.5 rounded-full theme-surface-strong theme-border border text-[color:var(--page-muted)] hover:text-red-500 hover:border-red-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-center md:text-left">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/80 hover:text-[color:var(--page-primary)] transition-colors font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold text-white mb-6">Contact</h4>
            <ul className="flex flex-col gap-4 text-center md:text-left">
              <li className="text-white/80">
                <span className="block font-medium text-white mb-1">Email</span>
                <a href={getEmailLink()} className="text-white hover:text-[color:var(--page-primary)] transition-colors break-all">jeetnathwani660@gmail.com</a>
              </li>
              <li className="text-white/80">
                <span className="block font-medium text-white mb-1">Location</span>
                Vadodara, Gujarat, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm font-medium">
            &copy; {new Date().getFullYear()} Jeet Nathwani. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full theme-surface-strong theme-border border hover:border-[color:var(--page-primary)] theme-text hover:text-[color:var(--page-primary)] transition-colors shadow-sm group"
          >
            <span className="font-semibold text-sm">Back to top</span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
