// Created by Raihan Patel
// Enhanced navigation with Slovak-specific styling

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const navigationItems = [
  { title: 'Domov', path: '/', english: 'Home' },
  { title: 'O Nás', path: '/about', english: 'About Us' },
  { title: 'Slovenská Škola', path: '/school', english: 'Slovak School' },
  { title: 'Podujatia', path: '/events', english: 'Events' },
  { title: 'Knižnica', path: '/library', english: 'Library' },
  { title: 'Časopis', path: '/journal', english: 'Journal' },
  { title: 'Kontakt', path: '/contact', english: 'Contact' }
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-blue-700 shadow-lg' : 'bg-blue-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 group">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${location.pathname === item.path
                      ? 'text-white bg-blue-700'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                    }
                    group
                  `}
                >
                  <span>{item.title}</span>
                  <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 
                                 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity
                                 text-blue-200">
                    {item.english}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className="hidden md:flex items-center ml-6">
            <select 
              className="bg-transparent text-white border border-blue-400 rounded px-2 py-1 text-sm
                         focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="sk">Slovenčina</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 
                         hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span className={`absolute w-full h-0.5 bg-current transform transition-all duration-200 ${
                  isOpen ? 'rotate-45 top-3' : 'top-1'
                }`}></span>
                <span className={`absolute w-full h-0.5 bg-current top-3 transition-opacity duration-200 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute w-full h-0.5 bg-current transform transition-all duration-200 ${
                  isOpen ? '-rotate-45 top-3' : 'top-5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-600">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.path
                  ? 'text-white bg-blue-700'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.title}
              <span className="ml-2 text-sm text-blue-200">({item.english})</span>
            </Link>
          ))}
          <select 
            className="mt-4 w-full bg-blue-700 text-white border border-blue-400 rounded px-3 py-2"
          >
            <option value="sk">Slovenčina</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;