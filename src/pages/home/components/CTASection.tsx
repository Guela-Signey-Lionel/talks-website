import { Link } from 'react-router-dom';
import backgroundImage from '../../../images/background.jpg';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="TALKS CTA"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003082]/90 to-[#1a2b4a]/85" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <span className="inline-block bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Engagement
        </span>
        <h2 className="text-white font-extrabold mb-6" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
          Rejoignez Notre Mouvement
        </h2>
        <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Soyez acteur du changement en Centrafrique. Ensemble, construisons un avenir meilleur pour notre nation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/about#adhesion"
            className="whitespace-nowrap bg-[#003082] text-white font-bold px-10 py-4 rounded-xl hover:-translate-y-1 hover:shadow-xl hover:bg-[#1a2b4a] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i className="ri-user-add-line" />
            Adhérer à TALKS
          </Link>
          <Link
            to="/about#contact"
            className="whitespace-nowrap border-2 border-white/50 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i className="ri-mail-line" />
            Nous Contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
