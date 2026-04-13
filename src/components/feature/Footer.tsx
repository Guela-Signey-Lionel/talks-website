import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#003082] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 - Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full border-2 border-[#d4af37] overflow-hidden">
                <img
                  src="https://static.readdy.ai/image/2cc1fd764c88cec0ebc40aa19f048a3c/c9e868d3a3cb5fa1b41f8635793b908d.jpeg"
                  alt="TALKS"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-widest text-[#d4af37]">TALKS</span>
            </div>
            <p className="text-gray-400 text-sm italic mb-3">Ensemble pour une Centrafrique meilleure</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              TALKS est un mouvement politique centrafricain dédié à la promotion de la démocratie participative et à l'engagement civique des citoyens.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.facebook.com/profile.php?id=61584438221894"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#1877F2] transition-colors duration-300 cursor-pointer"
                aria-label="Page Facebook TALKS"
              >
                <i className="ri-facebook-fill text-sm" />
              </a>
              <a
                href="https://wa.me/23672043505"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#25D366] transition-colors duration-300 cursor-pointer"
                aria-label="WhatsApp TALKS"
              >
                <i className="ri-whatsapp-fill text-sm" />
              </a>
            </div>
          </div>

          {/* Col 2 - Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Infolettre</h4>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Abonnez-vous pour recevoir nos dernières actualités et informations.
            </p>
            {subscribed ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-green-400 text-sm">
                <i className="ri-check-line mr-2" />
                Merci de votre inscription!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="whitespace-nowrap bg-[#1a2b4a] text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-[#0a1628] transition-colors"
                >
                  S'abonner
                </button>
              </form>
            )}
          </div>

          {/* Col 3 - Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Liens Rapides</h4>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'À Propos', path: '/about' },
                { label: 'Actualités', path: '/news' },
                { label: 'Adhésion', path: '/about#adhesion' },
                { label: 'Contact', path: '/about#contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-[#d4af37] hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <i className="ri-arrow-right-s-line text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Nous Contacter</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#d4af37]/20 mt-0.5 shrink-0">
                  <i className="ri-map-pin-line text-[#d4af37] text-sm" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Adresse</p>
                  <p className="text-gray-300 text-sm">Bangui, Centrafrique</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#d4af37]/20 mt-0.5 shrink-0">
                  <i className="ri-phone-line text-[#d4af37] text-sm" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Téléphone</p>
                  <p className="text-gray-300 text-sm">+236 72 04 35 05</p>
                  <p className="text-gray-300 text-sm">+236 70 12 34 56</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#d4af37]/20 mt-0.5 shrink-0">
                  <i className="ri-mail-line text-[#d4af37] text-sm" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Contact</p>
                  <p className="text-gray-300 text-sm">contact@talks-rca.org</p>
                  <p className="text-gray-300 text-sm">www.talks-rca.org</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="relative overflow-hidden mb-4">
            <p className="text-center font-black text-[clamp(60px,10vw,140px)] leading-none tracking-tight text-white/5 select-none pointer-events-none">
              TALKS
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-600 text-xs">
            <p>© 2026 TALKS - Tous droits réservés</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-400 transition-colors">Politique de Confidentialité</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-400 transition-colors">Conditions d'Utilisation</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
