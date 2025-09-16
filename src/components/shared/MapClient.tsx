'use client';
import 'leaflet/dist/leaflet.css';
import { TileLayer } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { useEffect, useState } from 'react';

const position: [number, number] = [39.8283, -98.5795];

const MapClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-full w-full bg-gray-200 animate-pulse rounded-2xl" />;
  }

  return (
    <>
      <MapContainer className="h-full w-full" center={position} zoom={6}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </>
  );
};

export default MapClient;
