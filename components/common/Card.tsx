
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white p-6 md:p-8 rounded-xl shadow-md transition-shadow hover:shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
