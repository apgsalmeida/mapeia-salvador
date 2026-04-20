'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { IComunidade } from '@/types/comunidade';
import 'leaflet/dist/leaflet.css';

// Importação dinâmica para evitar SSR do Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Ícone personalizado (opcional)
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

export default function MapaPage() {
  const [comunidades, setComunidades] = useState<IComunidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Carrega Leaflet apenas no cliente
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });

    fetch('/api/comunidades')
      .then((res) => res.json())
      .then((data) => {
        setComunidades(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading || !L) {
    return (
      <BackgroundWrapper type="internal">
        <div className="flex items-center justify-center h-full">
          <p>Carregando mapa...</p>
        </div>
      </BackgroundWrapper>
    );
  }

  // Centro do mapa (Salvador, BA)
  const defaultCenter: [number, number] = [-12.9714, -38.5014];
  const defaultZoom = 11;

  // Filtra comunidades com coordenadas válidas
  const comunidadesComCoords = comunidades.filter(
    (c) => c.latitude && c.longitude
  );

  return (
    <BackgroundWrapper type="internal">
      <div className="h-full w-full p-4">
        <div className="h-full rounded-xl overflow-hidden shadow-2xl border-4 border-white">
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {comunidadesComCoords.map((com) => {
              const icon = L.icon({
                iconUrl,
                iconRetinaUrl,
                shadowUrl,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              });

              return (
                <Marker
                  key={com._id}
                  position={[com.latitude!, com.longitude!]}
                  icon={icon}
                >
                  <Popup>
                    <div className="text-sm">
                      <h3 className="font-bold">{com.nomeComunidade}</h3>
                      <p>{com.tipoComunidade}</p>
                      <p>{com.localizacao}</p>
                      {com.contato && <p>📧 {com.contato}</p>}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </BackgroundWrapper>
  );
}