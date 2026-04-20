import BackgroundWrapper from '@/components/BackgroundWrapper';

export default function SobrePage() {
  return (
    <BackgroundWrapper type="internal">
      <div className="max-w-3xl mx-auto my-10 p-6 md:p-10 bg-white/85 rounded-xl shadow-2xl backdrop-blur-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#2d5a27] uppercase mb-6 border-b border-[#2d5a27]/20 pb-4">
          Sobre o Projeto
        </h1>
        <div className="prose prose-stone text-[#4a342e]">
          <p>
            Esta plataforma foi criada para reunir e tornar visíveis as comunidades tradicionais quilombolas e pesqueiras de Salvador e da Região Metropolitana. A proposta é simples: permitir que qualquer pessoa — inclusive órgãos públicos — consiga localizar essas comunidades no mapa, conhecer sua história, entender como vivem e identificar o que produzem ou oferecem.
          </p>
          <p>
            A iniciativa se apoia em bases legais já consolidadas no Brasil, como a Constituição Federal de 1988, que garante a proteção das manifestações culturais e dos modos de vida tradicionais, e a Convenção nº 169 da OIT, que assegura o respeito à autonomia dessas comunidades e ao direito de decisão sobre o uso e divulgação de suas informações, mediante consentimento livre, prévio e informado.
          </p>
          <h2 className="text-xl font-bold text-[#2d5a27] mt-8">Nossos Objetivos</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Organizar informações sobre essas comunidades em um só lugar;</li>
            <li>Ampliar sua visibilidade;</li>
            <li>Contribuir para o fortalecimento das suas atividades econômicas;</li>
            <li>Facilitar o acesso de instituições públicas a dados que possam orientar políticas mais adequadas à realidade desses territórios.</li>
          </ul>
          <p className="mt-6">
            O projeto tem caráter social e nasce do compromisso com o reconhecimento e a valorização dessas populações. Ao mesmo tempo, está vinculado a uma proposta de pesquisa acadêmica, construída com responsabilidade ética e respeito às comunidades.
          </p>
        </div>
      </div>
    </BackgroundWrapper>
  );
}