'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Início', href: '/' },
  { name: 'Mapa', href: '/mapa' },
  { name: 'Comunidades', href: '/produtos' },
  { name: 'Cadastro', href: '/cadastro' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-[#2d5a27] py-3 px-4 md:px-8 shadow-lg shrink-0 z-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo à esquerda */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Territórios Vivos"
            width={180}
            height={50}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        {/* Navegação à direita */}
        <nav>
          <ul className="flex justify-center gap-3 md:gap-6 flex-wrap list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-[#fcfbf4] no-underline font-bold uppercase text-xs md:text-sm tracking-wide transition-all duration-300 hover:text-[#a3cf9b] ${
                    pathname === item.href ? 'border-b-2 border-[#a3cf9b]' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}