'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import TermsModal from '@/components/TermsModal';
import { MapPin, Loader2 } from 'lucide-react';

export default function CadastroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeComunidade: '',
    tipoComunidade: 'Quilombola',
    localizacao: '',
    numeroFamilias: '',
    liderComunidade: '',
    atividadesProdutos: '',
    contato: '',
    redesocial: '',
    consentimento: false,
    latitude: '',
    longitude: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.consentimento) {
      setError('É necessário concordar com os termos da Convenção 169 da OIT.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        numeroFamilias: Number(formData.numeroFamilias),
        latitude: formData.latitude ? Number(formData.latitude) : undefined,
        longitude: formData.longitude ? Number(formData.longitude) : undefined,
      };

      const res = await fetch('/api/comunidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao cadastrar');
      }

      alert('Cadastro realizado com sucesso!');
      router.push('/produtos');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openTermsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setFormData(prev => ({ ...prev, consentimento: true }));
  };

  const handleGetLocation = () => {
    setLocationLoading(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocalização não é suportada pelo seu navegador.');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));
        setLocationLoading(false);
      },
      (error) => {
        let errorMessage = 'Erro ao obter localização.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permissão de localização negada.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Informação de localização indisponível.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tempo limite excedido ao obter localização.';
            break;
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <>
      <BackgroundWrapper type="internal">
        <div className="max-w-2xl mx-auto my-10 p-6 md:p-10 bg-white/85 rounded-xl shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2d5a27] uppercase mb-8 border-b border-[#2d5a27]/20 pb-4">
            Cadastrar Comunidade
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Tipo */}
            <div>
              <label className="block font-semibold text-[#2d5a27] mb-1">Tipo *</label>
              <select
                name="tipoComunidade"
                value={formData.tipoComunidade}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg bg-white/90"
              >
                <option>Quilombola</option>
                <option>Pesqueira</option>
                <option>Indígena</option>
                <option>Outros</option>
              </select>
            </div>

            {/* Nome */}
            <div>
              <label className="block font-semibold text-[#2d5a27] mb-1">Nome da Comunidade *</label>
              <input
                type="text"
                name="nomeComunidade"
                value={formData.nomeComunidade}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg bg-white/90"
              />
            </div>

            {/* Localização */}
            <div>
              <label className="block font-semibold text-[#2d5a27] mb-1">Localização (endereço) *</label>
              <input
                type="text"
                name="localizacao"
                value={formData.localizacao}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg bg-white/90"
              />
            </div>

            {/* Latitude e Longitude com botão de geolocalização */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#2d5a27]">Coordenadas Geográficas</label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={locationLoading}
                  className="text-sm text-[#2d5a27] hover:text-[#1e3d1a] flex items-center gap-1 disabled:opacity-50"
                >
                  {locationLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  Usar minha localização
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    placeholder="Latitude"
                    value={formData.latitude || ''}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white/90"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    placeholder="Longitude"
                    value={formData.longitude || ''}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white/90"
                  />
                </div>
              </div>
              {locationError && (
                <p className="text-red-500 text-sm mt-1">{locationError}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                As coordenadas ajudam a exibir a comunidade no mapa com precisão.
              </p>
            </div>

            {/* Nº famílias + Líder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#2d5a27] mb-1">Nº de famílias *</label>
                <input
                  type="number"
                  name="numeroFamilias"
                  value={formData.numeroFamilias}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white/90"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#2d5a27] mb-1">Líder da Comunidade *</label>
                <input
                  type="text"
                  name="liderComunidade"
                  value={formData.liderComunidade}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white/90"
                />
              </div>
            </div>

            {/* Atividades */}
            <div>
              <label className="block font-semibold text-[#2d5a27] mb-1">Atividades e Produtos *</label>
              <textarea
                name="atividadesProdutos"
                value={formData.atividadesProdutos}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white/90"
              />
            </div>

            {/* Contato */}
            <div>
              <label className="block font-semibold text-[#2d5a27] mb-1">Contato (e-mail/telefone)</label>
              <input
                type="text"
                name="contato"
                value={formData.contato}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white/90"
              />
            </div>

            {/* Redes Sociais */}
            <div>
              <label className="block font-semibold text-[#2d5a27] mb-1">Redes Sociais</label>
              <input
                type="text"
                name="redesocial"
                value={formData.redesocial}
                onChange={handleChange}
                placeholder="Ex: @comunidade, link do Instagram, etc."
                className="w-full p-3 border border-gray-300 rounded-lg bg-white/90"
              />
            </div>

            {/* Checkbox de consentimento */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consentimento"
                name="consentimento"
                checked={formData.consentimento}
                onChange={handleChange}
                required
                className="w-5 h-5 mt-1 accent-[#2d5a27]"
              />
              <label htmlFor="consentimento" className="text-sm font-medium">
                Concordo com a divulgação e os termos da{' '}
                <button
                  type="button"
                  onClick={openTermsModal}
                  className="text-[#2d5a27] underline hover:text-[#1e3d1a]"
                >
                  Convenção 169 da OIT
                </button>
                . *
              </label>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#2d5a27] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider shadow-md hover:bg-[#1e3d1a] transition disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </BackgroundWrapper>

      {/* Modal de Termos */}
      <TermsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        url="/convencao-169"
      />
    </>
  );
}