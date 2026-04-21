'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-[#2d5a27] py-3 px-4 md:px-8 shadow-lg shrink-0 z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-center">
        {/* Logo (centralizada junto com o menu em telas grandes) */}
        <Link href="/" className="flex items-center md:mr-8" onClick={closeMenu}>
          <Image
            src="/logo.png"
            alt="Territórios Vivos"
            width={180}
            height={50}
            className="h-8 w-auto md:h-10"
            priority
          />
        </Link>

        {/* Desktop Navigation - centralizado */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-[#fcfbf4] no-underline font-semibold uppercase text-sm tracking-wide transition-all duration-300 hover:text-[#a3cf9b] ${
                    pathname === item.href ? 'border-b-2 border-[#a3cf9b] pb-1' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#fcfbf4] p-2 rounded-lg hover:bg-[#1e3d1a] transition"
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#2d5a27] shadow-lg border-t border-[#a3cf9b]/20">
          <nav className="py-4">
            <ul className="flex flex-col items-center gap-2">
              {navItems.map((item) => (
                <li key={item.href} className="w-full text-center">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block py-3 text-[#fcfbf4] no-underline font-semibold uppercase text-sm tracking-wide transition-all duration-300 hover:bg-[#1e3d1a] ${
                      pathname === item.href ? 'bg-[#1e3d1a] border-l-4 border-[#a3cf9b]' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}