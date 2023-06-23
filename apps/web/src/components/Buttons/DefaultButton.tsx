'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

interface DefaultButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLogout?: boolean;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  isLogout,
  children,
}) => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true,
    });
  };

  return (
    <button onClick={handleLogout} className='bg-sky-400 px-3 py-2'>
      {isLogout ? 'Log out' : children}
    </button>
  );
};

export default DefaultButton;
