'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { NAVIGATION_ITEMS } from '@/constants/ui';
import Icon from '@/components/ui/Icon';

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${mounted && isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-neutral-200/50' 
            : 'bg-white/60 backdrop-blur-sm'
          }
        `}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="group flex items-center space-x-2 transition-all duration-200"
              >
                <Image 
                    src="/logo.png" 
                    alt="Dev.Blog Logo" 
                    width={32} 
                    height={32}
                    className="w-8 h-8 object-fill"
                  />
                <span className="text-xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                  Dev.Blog
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group relative px-4 py-2 rounded-lg transition-all duration-200 
                      ${isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-neutral-700 hover:text-blue-600 hover:bg-neutral-50'
                      }
                    `}
                  >
                    <span className="relative z-10 font-medium">{item.name}</span>
                    
                    {/* Hover tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-neutral-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45" />
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                <Icon 
                  name={isMobileMenuOpen ? 'close' : 'menu'}
                  className={`transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                  size={24}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`
          fixed inset-x-0 top-16 z-40 md:hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }
        `}
      >
        <div className="bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xl">
          <div className="container-custom py-4">
            <nav className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      block px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                        : 'text-neutral-700 hover:text-blue-600 hover:bg-neutral-50'
                      }
                    `}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-neutral-500 mt-1">{item.description}</div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;