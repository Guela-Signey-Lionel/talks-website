import { useState, FormEvent } from 'react';

const regions = [
  'Bangui', 'Ombella-M\'Poko', 'Lobaye', 'Sangha-Mbaéré', 'Mambéré-Kadéï', 'Mambéré',
  'Nana-Mambéré', 'Ouham', 'Ouham Fafa', 'Ouham-Pendé', 'Lim Pendé', 'Nana-Grébizi', 'Kémo',
  'Ouaka', 'Mbomou', 'Haut-Mbomou', 'Haute-Kotto', 'Basse-Kotto', 'Vakaga',
  'Bamingui-Bangoran', 'Autre (Diaspora)',
];

export default function AdhesionForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const motivation = (form.elements.namedItem('motivation') as HTMLTextAreaElement).value;
    if (motivation.length > 500) return;

    setStatus('loading');
    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, value.toString()));

    try {
      await fetch('https://readdy.ai/api/form/d79m06hrcamcd36dbjbg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setStatus('success');
      form.reset();
      setCharCount(0);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="adhesion" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden">
          {/* Left Panel */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#003082] to-[#1a2b4a] p-10 text-white flex flex-col justify-between">
            <div>
              <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">Devenez Membre</span>
              <h2 className="font-extrabold text-3xl mt-3 mb-6 leading-tight">
                Rejoignez<br />
                <span className="text-[#d4af37]">TALKS</span>
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">
                En adhérant à TALKS, vous rejoignez une communauté de patriotes engagés pour le développement et la stabilité de la République Centrafricaine.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Accès aux événements et formations exclusifs',
                  'Réseau de membres à travers tout le pays',
                  'Participation aux actions humanitaires',
                  'Contribution directe au développement national',
                  'Reconnaissance officielle de votre engagement',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-blue-100">
                    <i className="ri-check-line text-[#d4af37] mt-0.5 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <blockquote className="border-l-4 border-[#d4af37] pl-4 italic text-blue-200 text-sm">
              &ldquo;L'union fait la force. Ensemble, nous bâtissons une Centrafrique meilleure pour nos enfants.&rdquo;
            </blockquote>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-3 bg-[#f8f9fc] p-10">
            <h3 className="font-bold text-[#1a2b4a] text-xl mb-6">Formulaire d'Adhésion</h3>

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-green-700">
                <i className="ri-checkbox-circle-line text-xl" />
                <div>
                  <p className="font-semibold text-sm">Demande envoyée avec succès !</p>
                  <p className="text-xs text-green-600 mt-0.5">Nous vous contacterons dans les plus brefs délais.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-red-700">
                <i className="ri-error-warning-line text-xl" />
                <p className="text-sm">Une erreur est survenue. Veuillez réessayer.</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              data-readdy-form
              id="adhesion-form"
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom_complet"
                    required
                    placeholder="Votre nom et prénom"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="votre@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    required
                    placeholder="+236 75 00 00 00"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Préfecture d'Origine <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="region"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors bg-white cursor-pointer"
                  >
                    <option value="">Sélectionner votre Préfecture d'Origine</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  placeholder="Votre profession ou activité"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Motivation <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="motivation"
                  required
                  rows={4}
                  maxLength={500}
                  placeholder="Expliquez pourquoi vous souhaitez rejoindre TALKS..."
                  onChange={(e) => setCharCount(e.target.value.length)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors bg-white resize-vertical"
                />
                <p className={`text-xs mt-1 text-right ${charCount > 450 ? 'text-red-500' : 'text-gray-400'}`}>
                  {charCount}/500 caractères
                </p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="reglement"
                  id="reglement"
                  required
                  className="mt-1 cursor-pointer"
                />
                <label htmlFor="reglement" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                  J'accepte le <a href="#" className="text-[#003082] underline">règlement intérieur</a> de l'association TALKS et m'engage à respecter ses valeurs de discipline, de respect mutuel et d'engagement patriotique. <span className="text-red-500">*</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="whitespace-nowrap w-full bg-[#003082] text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:bg-[#1a2b4a] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line" />
                    Soumettre ma Demande d'Adhésion
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
