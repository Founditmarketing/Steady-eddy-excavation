import React, { useEffect, useRef, useState } from 'react';

export const SectionHeader: React.FC<{ title: string; subtitle: string; centered?: boolean }> = ({
  title,
  subtitle,
  centered = true
}) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <h2 className="text-3xl md:text-4xl font-extrabold text-eddy-dark mb-4 uppercase tracking-wide">
      {title}
    </h2>
    <div className={`h-1.5 w-24 bg-eddy-orange rounded-full mb-6 ${centered ? 'mx-auto' : ''}`}></div>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
      {subtitle}
    </p>
  </div>
);

export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={`bg-eddy-orange text-white px-8 py-3.5 rounded-md font-bold text-lg uppercase tracking-wider hover:bg-orange-600 transition-all transform hover:-translate-y-1 shadow-lg active:translate-y-0 active:shadow-sm ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const OutlineButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={`border-2 border-eddy-orange text-eddy-orange px-8 py-3.5 rounded-md font-bold text-lg uppercase tracking-wider hover:bg-eddy-orange hover:text-white transition-all ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: '0' | '100' | '200' | '300';
  direction?: 'up' | 'left' | 'right' | 'scale';
}> = ({
  children,
  className = "",
  delay = '0',
  direction = 'up'
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, we can stop observing to keep it visible
            if (ref.current) observer.unobserve(ref.current);
          }
        },
        {
          threshold: 0.1, // Trigger when 10% of the element is visible
          rootMargin: "0px 0px -50px 0px" // Trigger slightly before the bottom of the viewport
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, []);

    const delayClass = delay === '0' ? '' : `delay-${delay}`;

    let revealClass = '';
    if (direction === 'up') {
      revealClass = isVisible ? 'reveal-visible' : 'reveal-hidden';
    } else if (direction === 'left') {
      revealClass = isVisible ? 'reveal-visible-left' : 'reveal-hidden-left';
    } else if (direction === 'right') {
      revealClass = isVisible ? 'reveal-visible-right' : 'reveal-hidden-right';
    } else if (direction === 'scale') {
      revealClass = isVisible ? 'reveal-visible-scale' : 'reveal-hidden-scale';
    }

    return (
      <div
        ref={ref}
        className={`${className} reveal-base ${revealClass} ${delayClass}`}
      >
        {children}
      </div>
    );
  };