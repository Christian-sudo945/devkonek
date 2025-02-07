import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
}

const Sheet: React.FC<SheetProps> = ({ 
  open, 
  onOpenChange, 
  side = 'right', 
  children 
}) => {
  if (!open) return null;

  const sideClasses = {
    left: 'left-0 h-full w-64 animate-slide-in-left',
    right: 'right-0 h-full w-64 animate-slide-in-right',
    top: 'top-0 w-full h-64 animate-slide-in-top',
    bottom: 'bottom-0 w-full h-64 animate-slide-in-bottom'
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={() => onOpenChange(false)} 
      />
      <div 
        className={`
          fixed ${sideClasses[side]} 
          bg-white dark:bg-gray-800 
          shadow-lg z-50 
          transition-transform duration-300
        `}
      >
        <button 
          onClick={() => onOpenChange(false)} 
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </>
  );
};

interface SheetTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SheetTrigger: React.FC<SheetTriggerProps> = ({ children, onClick }) => (
  <div onClick={onClick}>
    {children}
  </div>
);

const SheetContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);

export { Sheet, SheetTrigger, SheetContent };