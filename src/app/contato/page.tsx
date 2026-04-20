import BackgroundWrapper from '@/components/BackgroundWrapper';

export default function ContatoPage() {
  return (
    <BackgroundWrapper type="internal">
      <div className="max-w-2xl mx-auto my-10 p-6 md:p-10 bg-white/85 rounded-xl shadow-2xl backdrop-blur-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#2d5a27] uppercase mb-6">Contato</h1>
        <p className="text-center text-lg">Em breve informações de contato.</p>
      </div>
    </BackgroundWrapper>
  );
}