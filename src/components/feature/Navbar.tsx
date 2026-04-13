import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { i18n, t } = useTranslation();

  const navLinks = [
    { label: t('navbar.home'), path: '/' },
    { label: t('navbar.about'), path: '/about' },
    { label: t('navbar.news'), path: '/news' },
    { label: t('navbar.activities'), path: '/activities' },
    { label: t('navbar.adhesion'), path: '/adhesion' },
    { label: t('navbar.contact'), path: '/about#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-10 left-0 right-0 z-40 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md top-0' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-[#003082] overflow-hidden group-hover:rotate-[360deg] transition-transform duration-700">
            <img
              src="https://static.readdy.ai/image/2cc1fd764c88cec0ebc40aa19f048a3c/c9e868d3a3cb5fa1b41f8635793b908d.jpeg"
              alt="TALKS Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-lg sm:text-xl tracking-widest text-[#003082] leading-tight">
              TALKS
            </span>
            <span className="text-[9px] font-medium text-[#003082]/60 tracking-wide leading-tight" style={{ maxWidth: '180px' }}>
              Touadéra A Lingbi Na Koua So
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 group whitespace-nowrap ${
                  isActive ? 'text-[#003082]' : 'text-[#003082]/70 hover:text-[#003082]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#003082] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#003082]/10 text-[#003082] hover:bg-[#003082] hover:text-white transition-all duration-300 cursor-pointer text-base"
              title={t('navbar.language')}
            >
              <i className="ri-global-line" />
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                      i18n.language === lang.code
                        ? 'bg-[#003082] text-white'
                        : 'text-[#003082]/70 hover:text-[#003082] hover:bg-[#003082]/5'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Social icons */}
          <a
            href="https://www.facebook.com/profile.php?id=61584438221894"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#003082]/10 text-[#003082] hover:bg-[#003082] hover:text-white transition-all duration-300 cursor-pointer"
            title="Facebook TALKS"
          >
            <i className="ri-facebook-fill text-base" />
          </a>
          <a
            href="https://wa.me/23672043505"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#003082]/10 text-[#003082] hover:bg-[#25D366] hover:text-white transition-all duration-300 cursor-pointer"
            title="WhatsApp TALKS"
          >
            <i className="ri-whatsapp-line text-base" />
          </a>
          <Link
            to="/adhesion"
            className="whitespace-nowrap bg-[#003082] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:-translate-y-0.5 hover:bg-[#1a2b4a] hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            {t('navbar.join')}
            <i className="ri-arrow-right-line" />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#003082] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`text-2xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[calc(100vh-6.5rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-3 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`text-sm font-semibold tracking-wide py-2 border-b border-gray-100 ${
                location.pathname === link.path ? 'text-[#003082]' : 'text-[#003082]/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Social links mobile */}
          <div className="flex flex-wrap items-center gap-3 py-2 border-b border-gray-100">
            <a
              href="https://www.facebook.com/profile.php?id=61584438221894"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-[#003082]/70 hover:text-[#003082]"
            >
              <i className="ri-facebook-fill" /> Facebook
            </a>
            <a
              href="https://wa.me/23672043505"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-[#003082]/70 hover:text-[#25D366]"
            >
              <i className="ri-whatsapp-line" /> WhatsApp
            </a>
          </div>
          {/* Language Selector Mobile */}
          <div className="py-2 border-b border-gray-100">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 text-sm font-semibold text-[#003082]/70 hover:text-[#003082] w-full"
            >
              <i className="ri-global-line" /> {t('navbar.language')}
              <i className={`ri-chevron-down-line text-xs transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {langMenuOpen && (
              <div className="mt-2 flex flex-col gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`text-left px-4 py-2 text-sm font-semibold transition-all duration-300 flex items-center gap-2 rounded ${
                      i18n.language === lang.code
                        ? 'bg-[#003082] text-white'
                        : 'text-[#003082]/70 hover:text-[#003082] hover:bg-[#003082]/5'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/adhesion"
            className="bg-[#003082] text-white font-bold text-sm px-6 py-3 rounded-full text-center mt-2"
          >
            {t('navbar.join')}
          </Link>
        </div>
      </div>
    </nav>
  );
}
