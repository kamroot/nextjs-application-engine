import React from 'react';

type ButtonInterface = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  id?: string; // used as id for the element
  disposition?: 'button' | 'submit';
};

const Button: React.FC<ButtonInterface> = ({ variant = 'primary', children, id, disposition = 'button' }) => {
  const primaryStyle =
    'bg-brand-core text-brand-neutral-900 hover:font-bold py-2 px-4 rounded mr-4 border-2 border-brand-core shadow-md';
  const secondaryStyle =
    'hover:bg-brand-secondary text-brand-dark-500 py-2 px-4 border-brand-core border-2 rounded mr-4 shadow-md';
  const tertiaryStye = 'rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white';
  const style = variant === 'primary' ? primaryStyle : variant === 'secondary' ? secondaryStyle : tertiaryStye;

  return (
    <button id={id ? id : ''} type={disposition} className={style}>
      {children}
    </button>
  );
};

export default Button;
