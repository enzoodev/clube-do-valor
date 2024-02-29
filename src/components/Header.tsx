import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Bars3CenterLeftIcon, BellIcon } from '@heroicons/react/24/solid';

import Logo from '@assets/logo.svg';

export const Header: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(searchText);
  }, [navigate, searchText]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setSearchText(event.target.value);
    }, []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        if (event.key === 'Enter') {
          handleNavigate();
        }
      },
      [handleNavigate],
    );

  const handleGoBack = useCallback(() => {
    navigate('./');
  }, [navigate]);

  return (
    <header className="w-full flex items-center justify-between gap-6 py-3 px-5 border-b border-[#E5E7EB]">
      <div className="w-full flex items-center gap-6">
        <img
          src={Logo}
          onClick={handleGoBack}
          alt="clube-do-valor-logo"
          className="w-11 h-11 cursor-pointer hidden sm:flex"
        />
        <div className="hidden md:flex">
          <div className="flex items-center bg-[#F9FAFB] gap-2.5 w-96 rounded-2xl border border-[#E5E7EB] px-3.5 h-11">
            <MagnifyingGlassIcon className="h-5 w-5 text-[##6B7280]" />
            <input
              placeholder="Pesquisar"
              type="text"
              className="w-full rounded-2xl h-full bg-[#F9FAFB]"
              value={searchText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
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
