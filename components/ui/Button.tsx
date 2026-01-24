import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
  
  const variants = {
    // Primary: Standard white button
    primary: "bg-white text-slate-900 hover:bg-slate-100 focus:ring-white",
    
    // Secondary: The "Brand" button (Flash Yellow). 
    // IMPORTANT: Dark text on Yellow background for readability and modern feel.
    secondary: "bg-brand-400 text-slate-950 font-semibold hover:bg-brand-300 focus:ring-brand-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    
    // Outline: Subtle border
    outline: "border border-slate-700 text-slate-300 hover:border-brand-400 hover:text-brand-400 focus:ring-brand-400 bg-transparent",
    
    // Ghost: Text only
    ghost: "text-slate-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};