'use client';

import { useEffect, useState, useMemo } from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import ComunidadeModal from '@/components/ComunidadeModal';
import { IComunidade } from '@/types/comunidade';
import { Search } from 'lucide-react';

export default function ProdutosPage() {
  const [comunidades, setComunidades] = useState<IComunidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroLocalizacao, setFiltroLocalizacao] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComunidade, setSelectedComunidade] = useState<IComunidade | null>(null);

  useEffect(() => {
    fetch('/api/comunidades')
      .then(res => res.json())
      .then(data => {
        setComunidades(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Lista de tipos únicos para o select
  const tiposUnicos = useMemo(() => {
    const tipos = new Set(comunidades.map(c => c.tipoComunidade));
    return Array.from(tipos).sort();
  }, [comunidades]);

  // Filtragem combinada
  const comunidadesFiltradas = useMemo(() => {
    return comunidades.filter(com => {
      const matchNome = com.nomeComunidade.toLowerCase().includes(filtroNome.toLowerCase());
      const matchTipo = filtroTipo === '' || com.tipoComunidade === filtroTipo;
      const matchLoc = com.localizacao.toLowerCase().includes(filtroLocalizacao.toLowerCase());
      return matchNome && matchTipo && matchLoc;
    });
  }, [comunidades, filtroNome, filtroTipo, filtroLocalizacao]);

  const openModal = (comunidade: IComunidade) => {
    setSelectedComunidade(comunidade);
    setModalOpen(true);
  };

  return (
    <BackgroundWrapper type="internal">
      <div className="max-w-6xl mx-auto my-10 p-6 md:p-8 bg-white/85 rounded-xl shadow-2xl backdrop-blur-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#2d5a27] uppercase mb-6 border-b border-[#2d5a27]/20 pb-4">
          Comunidades Cadastradas
        </h1>

        {loading ? (
          <p className="text-center">Carregando comunidades...</p>
        ) : comunidades.length === 0 ? (
          <p className="text-center">Nenhuma comunidade cadastrada ainda.</p>
        ) : (
          <>
            {/* Barra de busca rápida por nome */}
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white/90"
              />
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white/90 rounded-lg overflow-hidden shadow">
                <thead className="bg-[#2d5a27] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm uppercase tracking-wider">
                      Nome
                      <input
                        type="text"
                        placeholder="Filtrar nome..."
                        value={filtroNome}
                        onChange={(e) => setFiltroNome(e.target.value)}
                        className="mt-1 w-full px-2 py-1 text-white/80 text-sm rounded border-none focus:ring-1 focus:ring-[#a3cf9b]"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm uppercase tracking-wider">
                      Tipo
                      <select
                        value={filtroTipo}
                        onChange={(e) => setFiltroTipo(e.target.value)}
                        className="mt-1 w-full px-2 py-1 text-white/80 text-sm rounded border-none focus:ring-1 focus:ring-[#a3cf9b]"
                      >
                        <option value="">Todos</option>
                        {tiposUnicos.map(tipo => (
                          <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                      </select>
                    </th>
                    <th className="px-4 py-3 text-left text-sm uppercase tracking-wider">
                      Localização
                      <input
                        type="text"
                        placeholder="Filtrar local..."
                        value={filtroLocalizacao}
                        onChange={(e) => setFiltroLocalizacao(e.target.value)}
                        className="mt-1 w-full px-2 py-1 text-white/80 text-sm rounded border-none focus:ring-1 focus:ring-[#a3cf9b]"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comunidadesFiltradas.map(com => (
                    <tr key={com._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openModal(com)}
                          className="text-[#2d5a27] font-semibold hover:underline text-left"
                        >
                          {com.nomeComunidade}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{com.tipoComunidade}</td>
                      <td className="px-4 py-3 text-gray-700">{com.localizacao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {comunidadesFiltradas.length === 0 && (
              <p className="text-center text-gray-500 mt-4">Nenhum resultado encontrado.</p>
            )}
          </>
        )}
      </div>

      {/* Modal de detalhes */}
      <ComunidadeModal
        comunidade={selectedComunidade}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </BackgroundWrapper>
  );
}