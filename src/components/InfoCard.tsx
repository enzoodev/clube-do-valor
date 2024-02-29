import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  current: number;
};

export const InfoCard = React.memo(({ title, subtitle, current }: Props) => {
  const currentStateColor = current > 0 ? 'text-[#03543F]' : 'text-[#9B1C1C]';
  const currentStateBgColor = current > 0 ? 'bg-[#DEF7EC]' : 'bg-[#FBD5D5]';

  return (
    <div className="flex flex-1 flex-col gap-4 rounded-2xl p-6 bg-[#FFF] drop-shadow">
      <h3 className="text-xl text-gray-900 font-semibold">{title}</h3>
      <div className="w-full flex items-center justify-between">
        <div className="text-gray-900 font-semibold text-base">{subtitle}</div>
        <div
          className={`text-gray-900 text-xs ${currentStateBgColor} ${currentStateColor} py-0.5 px-2 rounded-lg`}
        >
          {current > 0 ? `+${current}` : current}%
        </div>
      </div>
    </div>
  );
});
