"use cl"
import React from 'react';
import Typewriter from '../typewriter/Typewriter';

interface ButtonProps {
  title: string;
  onClick?: () => void; // Optional click handler
  href?: string; // Optional link URL
}

const GradientButton: React.FC<ButtonProps> = ({ title, onClick, href }) => {
  return (
    <div className="relative inline-flex group">
      {/* Gradient background with hover effects */}
      <div
        className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r 
        from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 
        group-hover:-inset-1 group-hover:duration-200 animate-tilt"
      ></div>

      {href ? (
        // Link version of the button
        <a
          href={href}
          className="relative inline-flex items-center justify-center px-8 py-4 text-2xl 
          hover:text-3xl
          font-semibold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl delay-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          role="button"
        >
          <div className='mx-2'>
          {title}
          </div>
        <Typewriter/>
        </a>
      ) : (
        // Button version
        <button
          onClick={onClick}
          className="relative inline-flex items-center justify-center px-8 py-4  text-2xl hover:text-3xl delay-200
          font-semibold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
            <div className='mx-2'>
          {title}
          </div>
          <Typewriter/>
        </button>
      )}
    </div>
  );
};

export default GradientButton;
