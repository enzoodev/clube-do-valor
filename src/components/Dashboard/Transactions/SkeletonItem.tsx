import React from 'react';

export const TransactionSkeletonItem = React.memo(() => {
  return (
    <div className="w-full my-7 flex items-center justify-between animate-pulse">
      <div className="hidden sm:flex flex flex-1">
        <div className="h-4 w-24 sm:w-28 md:w-36 lg:w-48 bg-gray-200 rounded-full dark:bg-gray-300" />
      </div>
      <div className="flex flex-1">
        <div className="h-4 w-24 sm:w-28 md:w-36 lg:w-48 bg-gray-200 rounded-full dark:bg-gray-300" />
      </div>
      <div className="flex flex-1">
        <div className="h-4 w-24 sm:w-28 md:w-36 lg:w-48 bg-gray-200 rounded-full dark:bg-gray-300" />
      </div>
      <div className="flex flex-1">
        <div className="h-4 w-24 sm:w-28 md:w-36 lg:w-48 bg-gray-200 rounded-full dark:bg-gray-300" />
      </div>
    </div>
  );
});
