'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d5a27] text-white w-full mt-auto z-1000">
      <div className="mx-auto px-4 py-2 md:py-3 flex flex-col md:flex-row text-center justify-center items-center gap-5">
        <p>
          <span className="text-center text-xs leading-relaxed w-100">
            <span className="font-bold">Patricia Valesca</span> - Elaboração e design
          </span>
          <br className="block md:hidden"></br>
          <span className="text-center md:mx-10 text-xs leading-relaxed w-100">
            <span className="font-bold">Ana Paula</span> - Desenvolvimento Web
          </span>
          <span className="text-center hidden md:block text-xs leading-relaxed shrink-0">
            © {currentYear} - Todos os direitos reservados
          </span>
        </p>
      </div>
    </footer>
  );
}