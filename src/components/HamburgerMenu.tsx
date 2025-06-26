import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const links = [
  { href: '/', label: 'トップ' },
  { href: '/about', label: 'クワイア紹介' },
  { href: '/director', label: 'ディレクター紹介' },
  { href: '/movie', label: '映像集' },
];

const HamburgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        className="p-2 rounded-full bg-white shadow-lg border border-blue-100 text-[#2093f5] hover:bg-[#2093f5] hover:text-white transition"
        onClick={() => setOpen(!open)}
        aria-label="メニューを開く"
      >
        {open ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
      </button>
      {open && (
        <nav className="absolute top-12 left-0 w-48 bg-white rounded-xl shadow-xl border border-blue-100 py-4 px-2 animate-fade-in">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-4 py-2 rounded-lg text-[#2093f5] font-semibold hover:bg-[#2093f5] hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu; 