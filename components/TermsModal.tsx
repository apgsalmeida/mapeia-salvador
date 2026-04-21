'use client';

import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  url: string;
}

export default function TermsModal({ isOpen, onClose, onConfirm, url }: TermsModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset agreed quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setAgreed(false);
      setIsLoading(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (agreed) {
      onConfirm();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-[#2d5a27]">
            Convenção nº 169 da OIT
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo (iframe) */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-gray-500">Carregando documento...</div>
            </div>
          )}
          <iframe
            src={url}
            className="w-full h-full border-0"
            title="Convenção 169 da OIT"
            onLoad={() => setIsLoading(false)}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>

        {/* Footer com checkbox e botão */}
        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 accent-[#2d5a27]"
            />
            <span className="text-sm text-gray-700">
              Li e concordo com os termos da Convenção 169 da OIT.
            </span>
          </label>
          <button
            onClick={handleConfirm}
            disabled={!agreed}
            className="bg-[#2d5a27] text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1e3d1a] transition flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}