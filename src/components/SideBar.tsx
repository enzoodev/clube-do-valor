import React, { useCallback, useState } from 'react';
import {
  ChartPieIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentChartBarIcon,
  InboxArrowDownIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid';

export const SideBar: React.FC = () => {
  const [isShowAdvisorModules, setIsShowAdvisorModules] = useState(true);

  const handleToggleShowAdvisorModules = useCallback(() => {
    setIsShowAdvisorModules((prevState) => !prevState);
  }, []);

  return (
    <nav className="hidden md:flex flex-col bg-[#FFF] p-4 w-72">
      <div className="flex flex-col gap-6">
        <div
          className={`flex flex-row items-center justify-between gap-4
            rounded-lg cursor-pointer py-1 px-2`}
        >
          <div className="flex flex-row items-center gap-4">
            <ChartPieIcon className="w-6 h-6 text-[#1C64F2]" />
            <h3 className={`text-base 'text-[#1C64F2]' font-medium`}>
              Dashboard
            </h3>
          </div>
        </div>
        <div
          className={`flex flex-row items-center justify-between gap-4
            rounded-lg cursor-pointer py-1 px-2`}
        >
          <div className="flex flex-row items-center gap-4">
            <DocumentChartBarIcon className="w-6 h-6 text-[#111827]" />
            <h3 className={`text-base 'text-[#111827]' font-medium`}>
              Relatórios
            </h3>
          </div>
          <ChevronDownIcon className="h-5 w-5 text-[##6B7280]" />
        </div>
        <div>
          <div
            className={`flex flex-row items-center justify-between gap-4
          rounded-lg cursor-pointer py-1 px-2 ${isShowAdvisorModules ? 'bg-[#F3F4F6]' : ''}`}
            onClick={handleToggleShowAdvisorModules}
          >
            <div className="flex flex-row items-center gap-4">
              <ShoppingBagIcon className="w-6 h-6 text-[#111827]" />
              <h3 className={`text-base 'text-[#111827]' font-medium`}>
                Advisor
              </h3>
            </div>
            {isShowAdvisorModules ? (
              <ChevronUpIcon className="h-5 w-5 text-[##6B7280]" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-[##6B7280]" />
            )}
          </div>
          <div
            className={`${isShowAdvisorModules ? 'flex' : 'hidden'} flex-col gap-4 py-3 ml-12 transition-all duration-300`}
          >
            <h3
              className={`text-base 'text-[#111827]' font-medium cursor-pointer`}
            >
              Lista de clientes
            </h3>
            <h3
              className={`text-base 'text-[#111827]' font-medium cursor-pointer`}
            >
              Cobrança
            </h3>
            <h3
              className={`text-base 'text-[#111827]' font-medium cursor-pointer`}
            >
              Estatísticas
            </h3>
          </div>
        </div>
        <div
          className={`flex flex-row items-center justify-between gap-4
            rounded-lg cursor-pointer py-1 px-2`}
        >
          <div className="flex flex-row items-center gap-4">
            <InboxArrowDownIcon className="w-6 h-6 text-[#111827]" />
            <h3 className={`text-base 'text-[#111827]' font-medium`}>
              Mensagens
            </h3>
          </div>
          <div className="w-5 h-5 flex items-center justify-center font-medium text-xs rounded-full bg-[#FBD5D5] text-[#9B1C1C]">
            1
          </div>
        </div>
      </div>
      <div></div>
    </nav>
  );
};
