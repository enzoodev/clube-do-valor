import React from 'react';
import Logo from '@assets/logo.svg';
import { Bars3CenterLeftIcon, BellIcon } from '@heroicons/react/24/solid';
import { SearchInput } from './SearchInput';

export const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between gap-6 py-3 px-5 border-b border-[#E5E7EB]">
      <div className="w-full flex items-center gap-6">
        <a
          className="hidden sm:flex"
          href="https://clubedovalor.com.br/"
          target="_blank"
        >
          <img
            src={Logo}
            alt="clube-do-valor-logo"
            className="w-11 h-11 cursor-pointer"
          />
        </a>
        <div className="hidden md:flex">
          <SearchInput />
        </div>
        <Bars3CenterLeftIcon
          onClick={() => console.log('test')}
          className="h-7 w-7 cursor-pointer text-[#111827] flex md:hidden"
        />
      </div>
      <div className="flex items-center gap-3">
        <BellIcon className="h-6 w-6 cursor-pointer text-[#111827]" />
        <a href="https://github.com/enzoodev" target="_blank">
          <img
            src={'https://github.com/enzoodev.png'}
            alt="user-logo"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </a>
      </div>
    </header>
  );
};
