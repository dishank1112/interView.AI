import React from 'react';

interface ButtonProps {
  text: string;
  href: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>; // Add onClick prop
}

const Button: React.FC<ButtonProps> = ({ text, href, className = '', onClick, color}) => {
  return (
    <div className="relative inline-flex group">
      <div
     
        className="absolute transition-all duration-1000  opacity-70 -inset-px bg-gradient-to-r rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
      ></div>
      <a
        href={href}
        title={text}
        style={{backgroundColor:color}}
        className={`relative inline-flex items-center justify-center px-8 py-2 text-lg font-normal text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${className}`}
        role="button"
        onClick={onClick} // Attach the onClick handler
      >
        {text}
      </a>
    </div>
  );
};

export default Button;
