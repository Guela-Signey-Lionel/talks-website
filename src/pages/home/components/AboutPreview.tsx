import { Link } from 'react-router-dom';

const values = [
  { icon: 'ri-shield-star-line', title: 'Discipline', desc: 'Engagement envers les principes et valeurs du mouvement', color: '#003082' },
  { icon: 'ri-group-line', title: 'Respect', desc: 'Mutuel respect et dignité dans tous nos échanges', color: '#5cb85c' },
  { icon: 'ri-heart-line', title: 'Devoir', desc: 'Service à la nation et engagement communautaire', color: '#d4af37' },
  { icon: 'ri-flag-line', title: 'Patriotisme', desc: 'Amour et dévouement à la Centrafrique', color: '#c0392b' },
];

export default function AboutPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">Nos Valeurs</span>
          <h2 className="text-[#1a2b4a] font-extrabold mt-2 mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Qui Sommes-Nous
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            TALKS est bâti sur des principes fondamentaux qui guident chacune de nos actions
          </p>
        </div>

        {/* Flag-inspired bands */}
        <div className="rounded-2xl overflow-hidden mb-16">
          {/* Blue band */}
          <div className="bg-[#003082] px-8 py-10 text-white text-center">
            <i className="ri-government-line text-4xl text-[#d4af37] mb-3 block" />
            <h3 className="text-2xl font-bold mb-2">Notre Mission</h3>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Promouvoir la démocratie participative et engager les citoyens dans la vie politique de la Centrafrique
            </p>
          </div>
          {/* White band */}
          <div className="bg-white px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="text-center group">
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-4 transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ backgroundColor: `${v.color}15` }}
                  >
                    <i className={`${v.icon} text-2xl`} style={{ color: v.color }} />
                  </div>
                  <h4 className="font-bold text-[#1a2b4a] text-lg mb-2">{v.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Tricolor bottom band */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="bg-[#003082] px-6 py-8 text-white text-center">
              <p className="font-bold text-lg italic">Démocratie et participation</p>
            </div>
            <div className="bg-[#d4af37] px-6 py-8 text-white text-center">
              <p className="font-bold text-lg italic">Unité et solidarité</p>
            </div>
            <div className="bg-[#c0392b] px-6 py-8 text-white text-center">
              <p className="font-bold text-lg italic">Progrès et développement</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/about"
            className="whitespace-nowrap inline-flex items-center gap-2 bg-[#1a2b4a] text-white font-semibold px-8 py-3.5 rounded-xl hover:-translate-y-0.5 hover:bg-[#0f1a2e] transition-all duration-300"
          >
            En Savoir Plus
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
