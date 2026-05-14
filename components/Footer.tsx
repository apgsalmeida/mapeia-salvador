'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d5a27] text-white w-full mt-auto ">
      <div className="mx-auto px-4 py-2 md:py-3 flex justify-center items-center gap-5">
        <span className="text-center text-xs leading-relaxed w-100">
          <span className="font-bold">Patricia Valesca</span> - Elaboração e design
        </span>
        <span className="text-center text-xs leading-relaxed w-100">
          <span className="font-bold">Ana Paula</span> - Desenvolvimento Web
        </span>
        <span className="text-center text-xs leading-relaxed shrink-0">
          © {currentYear} - Todos os direitos reservados
        </span>
      </div>
    </footer>
  );
}