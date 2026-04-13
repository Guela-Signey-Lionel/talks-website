import { nationalCoordination, nationalMembers, focalPoints } from '@/mocks/coordination';

export default function CoordinationSection() {
  return (
    <section id="coordination" className="py-24 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">Structure Organisationnelle</span>
          <h2 className="text-[#1a2b4a] font-extrabold mt-2 mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Coordination Nationale
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            TALKS est structurée autour d'une coordination nationale forte et de points focaux préfectoraux dévoués à la mission de l'association.
          </p>
        </div>

        {/* Level 1 - Top 2 Leaders */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          {[nationalCoordination.president, nationalCoordination.vicePresident].map((person, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#003082] to-[#1a2b4a] rounded-2xl p-8 text-white text-center w-full sm:w-72"
            >
              <div className="w-28 h-28 rounded-full border-4 border-[#d4af37] overflow-hidden mx-auto mb-4">
                <img src={person.photo} alt={person.name} className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="font-bold text-xl mb-1">{person.name}</h3>
              <p className="text-[#d4af37] text-sm font-semibold mb-2">{person.role}</p>
              <p className="text-blue-200 text-xs mb-4">{person.region}</p>
              <div className="flex items-center justify-center gap-2 text-blue-200 text-xs">
                <i className="ri-phone-line" />
                <span>{person.phone}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Connector */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-6 bg-[#d4af37]" />
            <div className="w-3 h-3 rounded-full bg-[#d4af37]" />
            <div className="w-px h-6 bg-[#d4af37]" />
          </div>
        </div>

        {/* Level 2 - 8 National Members */}
        <div className="mb-10">
          <h3 className="text-center text-[#1a2b4a] font-bold text-lg mb-8 flex items-center justify-center gap-3">
            <span className="h-px flex-1 bg-[#d4af37]/30 max-w-xs" />
            Membres de la Coordination Nationale
            <span className="h-px flex-1 bg-[#d4af37]/30 max-w-xs" />
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {nationalMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl p-5 text-center border border-[#003082]/10 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-20 h-20 rounded-full border-2 border-[#003082]/30 overflow-hidden mx-auto mb-3">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <p className="font-bold text-[#1a2b4a] text-sm leading-tight mb-1">{member.name}</p>
                <p className="text-[#003082] text-xs font-semibold mb-1">{member.role}</p>
                <p className="text-gray-400 text-xs">{member.region}</p>
                <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mt-2">
                  <i className="ri-phone-line text-[#d4af37]" />
                  <span>{member.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-6 bg-[#d4af37]" />
            <div className="w-3 h-3 rounded-full bg-[#d4af37]" />
            <div className="w-px h-6 bg-[#d4af37]" />
          </div>
        </div>

        {/* Level 3 - Focal Points */}
        <div className="mb-6">
          <h3 className="text-center text-[#1a2b4a] font-bold text-lg mb-8 flex items-center justify-center gap-3">
            <span className="h-px flex-1 bg-[#d4af37]/30 max-w-xs" />
            Points Focaux Préfectoraux
            <span className="h-px flex-1 bg-[#d4af37]/30 max-w-xs" />
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {focalPoints.map((fp) => (
              <div
                key={fp.id}
                className="bg-white rounded-xl p-5 text-center border border-[#003082]/10 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-16 h-16 rounded-full border-2 border-[#003082]/30 overflow-hidden mx-auto mb-3">
                  <img src={fp.photo} alt={fp.name} className="w-full h-full object-cover object-top" />
                </div>
                <p className="font-bold text-[#1a2b4a] text-sm leading-tight mb-1">{fp.name}</p>
                <p className="text-[#d4af37] text-xs font-semibold mb-1">{fp.role}</p>
                <p className="text-gray-400 text-xs">{fp.region}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hierarchy Legend */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-100">
          <h4 className="font-bold text-[#1a2b4a] text-base mb-4 text-center">Hiérarchie de l'Association</h4>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {[
              { label: 'Coordination Nationale', color: '#003082', icon: 'ri-building-line' },
              { label: '→', color: '#d4af37', icon: '' },
              { label: 'Points Focaux', color: '#5cb85c', icon: 'ri-map-pin-line' },
              { label: '→', color: '#d4af37', icon: '' },
              { label: 'Membres', color: '#d4af37', icon: 'ri-user-line' },
            ].map((item, i) => (
              item.icon ? (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${item.color}15` }}>
                  <i className={`${item.icon} text-sm`} style={{ color: item.color }} />
                  <span className="text-sm font-semibold" style={{ color: item.color }}>{item.label}</span>
                </div>
              ) : (
                <span key={i} className="text-2xl font-bold" style={{ color: item.color }}>{item.label}</span>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
