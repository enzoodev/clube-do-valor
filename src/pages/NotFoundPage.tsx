import React, { useCallback } from 'react';
import Icon from '@assets/404.svg';
import { useNavigate } from 'react-router-dom';
import { Header } from '@components/Header';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate('./');
  }, [navigate]);

  return (
    <div>
      <Header />
      <main className="flex flex-col w-full h-full items-center justify-center">
        <img
          onClick={handleGoBack}
          src={Icon}
          alt="404-logo"
          className="cursor-pointer"
        />
        <h3
          className="text-gray-500 font-semibold text-lg hover:text-gray-700 active:text-gray-900 cursor-pointer"
          onClick={handleGoBack}
        >
          Página não encontrada, voltar para tela inicial.
        </h3>
      </main>
    </div>
  );
};
