'use client';

import { useEffect, useState } from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { IComunidade } from '@/types/comunidade';

export default function ProdutosPage() {
  const [comunidades, setComunidades] = useState<IComunidade[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/comunidades')
      .then(res => res.json())
      .then(data => {
        setComunidades(data);
        if (data.length > 0) setSelectedId(data[0]._id);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const selected = comunidades.find(c => c._id === selectedId);

  // Construção de URL do Google Maps (exemplo simples)
  const mapUrl = selected
    ? `https://maps.google.com/maps?q=${encodeURIComponent(selected.localizacao)}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    : '';

  return (
    <BackgroundWrapper type="internal">
      <div className="max-w-3xl mx-auto my-10 p-6 md:p-8 bg-white/85 rounded-xl shadow-2xl backdrop-blur-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#2d5a27] uppercase mb-6 border-b border-[#2d5a27]/20 pb-4">
          Produtos e Serviços
        </h1>

        {loading ? (
          <p className="text-center">Carregando comunidades...</p>
        ) : comunidades.length === 0 ? (
          <p className="text-center">Nenhuma comunidade cadastrada ainda.</p>
        ) : (
          <>
            <div className="mb-5">
              <label className="block text-sm font-bold text-[#2d5a27] uppercase mb-1">Comunidade:</label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full p-3 border-2 border-[#2d5a27] rounded-lg bg-white font-semibold"
              >
                {comunidades.map(com => (
                  <option key={com._id} value={com._id}>
                    {com.nomeComunidade} ({com.tipoComunidade})
                  </option>
                ))}
              </select>
            </div>

            {selected && (
              <>
                <div className="space-y-3 text-[#4a342e]">
                  <div>
                    <span className="font-bold text-[#2d5a27] uppercase text-sm">Localização:</span>
                    <p>{selected.localizacao}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#2d5a27] uppercase text-sm">Descrição:</span>
                    <p>{selected.atividadesProdutos}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#2d5a27] uppercase text-sm">Liderança:</span>
                    <p>{selected.liderComunidade}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#2d5a27] uppercase text-sm">Nº de Famílias:</span>
                    <p>{selected.numeroFamilias}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#2d5a27] uppercase text-sm">Atividades Econômicas:</span>
                    <p>{selected.atividadesProdutos}</p>
                  </div>
                  {selected.contato && (
                    <div>
                      <span className="font-bold text-[#2d5a27] uppercase text-sm">Contato:</span>
                      <p>{selected.contato}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 rounded-lg overflow-hidden h-64 border border-gray-300">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={mapUrl}
                    allowFullScreen
                  ></iframe>
                </div>

                {selected.contato && (
                  <a
                    href={`mailto:${selected.contato}`}
                    className="block w-fit mx-auto mt-8 bg-[#2d5a27] text-white px-8 py-3 rounded-full font-bold uppercase text-sm hover:bg-[#1e3d1a] transition"
                  >
                    Entrar em contato
                  </a>
                )}
              </>
            )}
          </>
        )}
      </div>
    </BackgroundWrapper>
  );
}