'use client';

import { IComunidade } from '@/types/comunidade';
import { X } from 'lucide-react';

interface ComunidadeModalProps {
  comunidade: IComunidade | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ComunidadeModal({ comunidade, isOpen, onClose }: ComunidadeModalProps) {
  if (!isOpen || !comunidade) return null;

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(comunidade.localizacao)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-[#2d5a27]">{comunidade.nomeComunidade}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-bold text-[#2d5a27] uppercase text-sm">Tipo:</span>
              <p>{comunidade.tipoComunidade}</p>
            </div>
            <div>
              <span className="font-bold text-[#2d5a27] uppercase text-sm">Localização:</span>
              <p>{comunidade.localizacao}</p>
            </div>
            <div>
              <span className="font-bold text-[#2d5a27] uppercase text-sm">Nº de Famílias:</span>
              <p>{comunidade.numeroFamilias}</p>
            </div>
            <div>
              <span className="font-bold text-[#2d5a27] uppercase text-sm">Liderança:</span>
              <p>{comunidade.liderComunidade}</p>
            </div>
          </div>

          <div>
            <span className="font-bold text-[#2d5a27] uppercase text-sm">Atividades e Produtos:</span>
            <p className="mt-1">{comunidade.atividadesProdutos}</p>
          </div>

          {comunidade.contato && (
            <div>
              <span className="font-bold text-[#2d5a27] uppercase text-sm">Contato:</span>
              <p>{comunidade.contato}</p>
            </div>
          )}

          {comunidade.redesocial && (
            <div>
              <span className="font-bold text-[#2d5a27] uppercase text-sm">Redes Sociais:</span>
              <p>{comunidade.redesocial}</p>
            </div>
          )}

          {/* Mapa */}
          <div className="mt-4 rounded-lg overflow-hidden h-64 border border-gray-300">
            <iframe
              title="Mapa"
              width="100%"
              height="100%"
              frameBorder="0"
              src={mapUrl}
              allowFullScreen
            />
          </div>

          {comunidade.contato && (
            <div className="flex justify-center pt-4">
              <a
                href={`mailto:${comunidade.contato}`}
                className="bg-[#2d5a27] text-white px-6 py-2 rounded-full font-bold uppercase text-sm hover:bg-[#1e3d1a] transition"
              >
                Entrar em contato
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}