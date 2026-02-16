import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'about' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-eddy-dark/95 backdrop-blur-md shadow-lg py-2 border-b-4 border-eddy-orange' 
          : 'bg-transparent py-6 border-b-4 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
             <div className="flex flex-col">
                <span className="text-2xl font-black text-eddy-orange tracking-tighter uppercase group-hover:text-white transition-colors">Steady Eddy</span>
                <span className="text-xs font-semibold tracking-[0.2em] text-gray-300 group-hover:text-eddy-orange transition-colors">Excavation LLC</span>
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-white hover:text-eddy-orange px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors drop-shadow-md"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className={`px-6 py-2.5 rounded font-bold transition-all transform hover:-translate-y-1 shadow-lg flex items-center gap-2 ${
                isScrolled 
                  ? 'bg-eddy-orange text-white hover:bg-white hover:text-eddy-dark' 
                  : 'bg-white text-eddy-dark hover:bg-eddy-orange hover:text-white'
              }`}
            >
              <Phone size={16} />
              <span>Get Quote</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-eddy-orange focus:outline-none bg-black/20 p-2 rounded-md backdrop-blur-sm"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-eddy-dark border-t border-gray-800 animate-in slide-in-from-top-10 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-gray-300 hover:text-eddy-orange hover:bg-white/5 block px-3 py-4 rounded-md text-base font-bold text-center border-b border-gray-800"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-center bg-eddy-orange text-white font-bold py-4 mt-2 rounded-md"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;