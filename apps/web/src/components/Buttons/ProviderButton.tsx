'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

interface ProviderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider?: 'github' | 'discord';
}

const ProviderButton: React.FC<ProviderButtonProps> = ({ provider }) => {
  const login = () => {
    signIn(provider);
  };

  return (
    <button className='bg-sky-400 px-3 py-2' onClick={login}>
      Login with {provider}
    </button>
  );
};

export default ProviderButton;
