import React from 'react';

export const TextContainer: React.FC = ({ children }) => {
  return (
    <main
      className="text-brand-dark container col-span-full mx-auto min-h-screen max-w-6xl
      bg-brand-neutral-50 px-8 shadow-lg md:px-16 lg:px-28"
    >
      {children}
    </main>
  );
};
