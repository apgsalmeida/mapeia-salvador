import BackgroundWrapper from '@/components/BackgroundWrapper';
import Link from 'next/link';
import { headers } from 'next/headers';

export default async function Home() {
  let total = 0;

  try {
    // Obtém o host da requisição atual (disponível em Server Components)
    const headersList = headers();
    const host = (await headersList).get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/comunidades`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      total = Array.isArray(data) ? data.length : 0;
    }
  } catch (error) {
    console.error('Erro ao buscar total de comunidades:', error);
  }

  return (
    <BackgroundWrapper type="home">
      <div className="flex flex-col items-center justify-center h-full text-white bg-black/30">
        <h1 className="text-7xl md:text-8xl text-center font-extrabold drop-shadow-lg">
          MAPEIA BAHIA
        </h1>
        <h2 className="text-2xl md:text-5xl text-center font-semibold drop-shadow mt-2">
          COMUNIDADES TRADICIONAIS
        </h2>
        <p className="text-lg md:text-xl mt-6 max-w-2xl text-center drop-shadow">
          Conectando territórios, saberes e economias tradicionais
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/mapa"
            className="bg-[#2d5a27] hover:bg-[#1e3d1a] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider shadow-lg transition"
          >
            Explorar no Mapa
          </Link>
          <Link
            href="/cadastro"
            className="bg-white/90 hover:bg-white text-[#2d5a27] px-8 py-3 rounded-full font-bold uppercase tracking-wider shadow-lg transition"
          >
            Cadastrar Comunidade
          </Link>
        </div>

        <div className="mt-10 md:mt-15 bg-white/80 text-[#2d5a27] p-6 rounded-lg shadow-xl text-center min-w-[200px]">
          <span className="text-5xl font-bold block">{total}</span>
          <span className="text-xl uppercase tracking-wider">Comunidades</span>
          <p className="mt-2 text-sm">Quilombolas & Pesqueiras</p>
        </div>
      </div>
    </BackgroundWrapper>
  );
}