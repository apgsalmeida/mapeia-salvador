'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d5a27] text-white w-full mt-auto shrink-0">
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-3">
        <p className="text-center text-sm md:text-base leading-relaxed">
          <span className="font-semibold">Produzido por:</span>{' '}
          Patrícia Valesca e Ana Paula Gomes
        </p>
        <p className="text-center text-sm md:text-base leading-relaxed">
          © {currentYear} Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}