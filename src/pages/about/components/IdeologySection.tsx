const principles = [
  {
    icon: 'ri-shield-check-line',
    title: 'Discipline',
    desc: 'Chaque membre s\'engage à respecter les règles de l\'association et à agir avec rigueur, ponctualité et sérieux dans toutes ses actions au sein de TALKS.',
    color: '#003082',
  },
  {
    icon: 'ri-group-line',
    title: 'Respect Mutuel',
    desc: 'La fraternité, la tolérance et le respect entre tous les membres constituent les fondements inébranlables de notre cohésion et de notre force collective.',
    color: '#5cb85c',
  },
  {
    icon: 'ri-medal-line',
    title: 'Sens du Devoir',
    desc: 'Nous plaçons l\'intérêt supérieur de la nation centrafricaine au-dessus de tout intérêt personnel, partisan ou régional.',
    color: '#d4af37',
  },
  {
    icon: 'ri-flag-2-line',
    title: 'Engagement Patriotique',
    desc: 'L\'amour profond de la République Centrafricaine guide chacune de nos actions, décisions et prises de position au quotidien.',
    color: '#c0392b',
  },
];

const prohibitions = [
  'Propos injurieux ou diffamatoires envers quiconque',
  'Contenus contraires aux lois de la République',
  'Messages de haine, de division ou d\'incitation à la violence',
  'Désinformation et fausses nouvelles',
  'Toute forme de discrimination ethnique, religieuse ou régionale',
  'Comportements portant atteinte à l\'image de l\'association',
];

export default function IdeologySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">Notre Fondement</span>
          <h2 className="text-[#1a2b4a] font-extrabold mt-2 mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Idéologie & Valeurs
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            TALKS est fondée sur des principes immuables qui guident chaque action de ses membres et définissent son identité patriotique.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {principles.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 text-center group hover:-translate-y-1 transition-transform duration-300"
              style={{ backgroundColor: `${p.color}08`, border: `1px solid ${p.color}20` }}
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-5"
                style={{ backgroundColor: `${p.color}15` }}
              >
                <i className={`${p.icon} text-2xl`} style={{ color: p.color }} />
              </div>
              <h3 className="font-bold text-[#1a2b4a] text-xl mb-3">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Rules Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Publications Rules */}
          <div className="bg-[#f0f4ff] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#003082]/10">
                <i className="ri-file-text-line text-[#003082] text-xl" />
              </div>
              <h3 className="font-bold text-[#1a2b4a] text-xl">Règles de Publication</h3>
            </div>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
              Tout contenu publié au nom de TALKS ou par ses membres doit respecter les critères suivants :
            </p>
            <ul className="space-y-3">
              {[
                'Être constructif et orienté vers le développement',
                'Respecter les objectifs et la mission de l\'association',
                'Valoriser les actions de développement national',
                'Être vérifié et basé sur des faits avérés',
                'Contribuer positivement à l\'image de la Centrafrique',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <i className="ri-check-line text-[#5cb85c] mt-0.5 shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Prohibitions */}
          <div className="bg-[#fff5f5] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#c0392b]/10">
                <i className="ri-forbid-line text-[#c0392b] text-xl" />
              </div>
              <h3 className="font-bold text-[#1a2b4a] text-xl">Interdictions Formelles</h3>
            </div>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
              Il est formellement interdit à tout membre de TALKS de publier ou diffuser :
            </p>
            <ul className="space-y-3">
              {prohibitions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <i className="ri-close-circle-line text-[#c0392b] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
