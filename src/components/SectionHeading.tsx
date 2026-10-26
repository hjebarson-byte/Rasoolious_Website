import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  return (
    <div
      className={`mb-10 md:mb-14 ${
        align === 'center' ? 'text-center mx-auto' : 'text-left'
      } max-w-2xl ${className}`}
    >
      {badge && (
        <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-caramel-100 text-chocolate-800 border border-caramel-300">
          {badge}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-chocolate-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-chocolate-600 text-base md:text-lg leading-relaxed text-balance">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-0.5 w-12 bg-caramel-400 rounded-full ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};
