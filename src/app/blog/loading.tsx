'use client';

import React from 'react';

export default function Loading(): JSX.Element {
  const skeletonCards = Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className="bg-black/50 border border-green-500/20 p-6 rounded-lg animate-pulse">
      <div className="h-4 bg-green-500/20 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-green-500/20 rounded w-1/2"></div>
    </div>
  ));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletonCards}
      </div>
    </div>
  );
}
