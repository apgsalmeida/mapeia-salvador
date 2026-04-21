'use client';

export default function Footer() {

  return (
    <footer className="bg-[#2d5a27] shadow-lg shrink-0 z-999 fixed bottom-0 w-full h-12">
      <div className="w-full mx-auto p-4 align-middle justify-center text-white flex flex-col md:flex-row items-center gap-4">
        <p><span className="font-bold">Produzido por: </span>Patrícia Valesca e Ana Paula Gomes - ©{ new Date().getFullYear() }</p>
      </div>
    </footer>
  );
}