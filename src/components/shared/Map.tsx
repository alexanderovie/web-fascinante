'use client';
import dynamic from 'next/dynamic';

// Importación dinámica del Client Component del mapa
const DynamicMap = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200 animate-pulse rounded-2xl" />
});

// Client Component que renderiza el mapa dinámicamente
const Map = () => {
  return <DynamicMap />;
};

export default Map;
