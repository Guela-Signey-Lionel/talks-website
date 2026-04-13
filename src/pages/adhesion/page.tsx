import { useState, FormEvent } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import Ticker from '@/components/feature/Ticker';
import { Link } from 'react-router-dom';

const regions = [
  'Bangui', "Ombella-M'Poko", 'Lobaye', 'Sangha-Mbaéré', 'Mambéré-Kadéï', 'Mambaré',
  'Nana-Mambéré', 'Ouham', 'Ouham-Fafa', 'Ouham-Pendé', 'Lim-Pendé', 'Nana-Grébizi', 'Kémo',
  'Ouaka', 'Mbomou', 'Haut-Mbomou', 'Haute-Kotto', 'Basse-Kotto', 'Vakaga',
  'Bamingui-Bangoran', 'Autre (Diaspora)',
];

const domaines = [
  'Humanitaire & Solidarité',
  'Formation & Éducation',
  'Santé Communautaire',
  'Développement Économique',
  'Culture & Arts',
  'Sport & Jeunesse',
  'Communication & Médias',
  'Environnement',
  'Diplomatie & Relations Internationales',
];

const steps = [
  { icon: 'ri-file-text-line', label: 'Remplir le formulaire', desc: 'Complétez vos informations personnelles et votre motivation.' },
  { icon: 'ri-send-plane-line', label: 'Soumettre la demande', desc: 'Votre dossier est transmis au bureau national de TALKS.' },
  { icon: 'ri-search-eye-line', label: 'Examen du dossier', desc: 'Le comité d\'admission examine votre candidature sous 7 jours.' },
  { icon: 'ri-checkbox-circle-line', label: 'Confirmation', desc: 'Vous recevez votre confirmation et votre carte de membre.' },
];

export default function AdhesionPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);
  const [selectedDomaines, setSelectedDomaines] = useState<string[]>([]);

  const toggleDomaine = (d: string) => {
    setSelectedDomaines((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const motivation = (form.elements.namedItem('motivation') as HTMLTextAreaElement).value;
    if (motivation.length > 500) return;

    setStatus('loading');
    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, value.toString()));
    if (selectedDomaines.length > 0) {
      body.append('domaines_engagement', selectedDomaines.join(', '));
    }

    try {
      await fetch('https://readdy.ai/api/form/d79opt1rcamcd36dbkkg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setStatus('success');
      form.reset();
      setCharCount(0);
      setSelectedDomaines([]);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <Ticker />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#003082] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-white">Adhésion</span>
          </div>
          <div className="max-w-3xl">
            <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">Rejoignez-nous</span>
            <h1 className="text-white font-extrabold mt-3 mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
              Devenez Membre de TALKS
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl">
              Rejoignez une communauté de patriotes engagés pour la paix, la stabilité et le développement de la République Centrafricaine. Votre adhésion renforce notre mission collective.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <span className="text-[#003082] text-xs font-bold uppercase tracking-widest">Processus</span>
            <h2 className="text-[#1a2b4a] font-extrabold text-2xl mt-2">Étapes d'Inscription</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-6 rounded-xl bg-[#f8f9ff]">
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#003082] text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] right-[-50%] h-0.5 bg-[#003082]/20" />
                )}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#003082]/10 mb-4 mt-2">
                  <i className={`${step.icon} text-[#003082] text-2xl`} />
                </div>
                <h3 className="font-bold text-[#1a2b4a] text-sm mb-2">{step.label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left - Benefits */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-[#003082] to-[#1a2b4a] rounded-2xl p-8 text-white sticky top-28">
                <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">Avantages</span>
                <h2 className="font-extrabold text-2xl mt-3 mb-6 leading-tight">
                  Pourquoi rejoindre<br />
                  <span className="text-[#d4af37]">TALKS ?</span>
                </h2>
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: 'ri-group-line', text: 'Réseau de membres à travers tout le pays' },
                    { icon: 'ri-calendar-event-line', text: 'Accès aux événements et formations exclusifs' },
                    { icon: 'ri-heart-line', text: 'Participation aux actions humanitaires' },
                    { icon: 'ri-trophy-line', text: 'Reconnaissance officielle de votre engagement' },
                    { icon: 'ri-global-line', text: 'Connexion avec la diaspora centrafricaine' },
                    { icon: 'ri-shield-star-line', text: 'Carte de membre officielle TALKS' },
                    { icon: 'ri-megaphone-line', text: 'Voix dans les décisions de l\'association' },
                  ].map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-blue-100">
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#d4af37]/20 shrink-0 mt-0.5">
                        <i className={`${b.icon} text-[#d4af37] text-sm`} />
                      </div>
                      {b.text}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="w-8 h-8 rounded-full border-2 border-[#003082] overflow-hidden">
                          <img
                            src={`src/images/Sig.jpg`}
                            alt="Membre"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-white/70 text-xs">+500 membres actifs</p>
                  </div>
                  <blockquote className="italic text-blue-200 text-xs leading-relaxed border-l-2 border-[#d4af37] pl-3">
                    &ldquo;Ensemble, nous bâtissons une Centrafrique meilleure pour nos enfants et les générations futures.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 md:p-10">
                <h3 className="font-extrabold text-[#1a2b4a] text-xl mb-2">Formulaire d'Adhésion</h3>
                <p className="text-gray-500 text-sm mb-8">Tous les champs marqués d'un <span className="text-red-500">*</span> sont obligatoires.</p>

                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 shrink-0">
                      <i className="ri-checkbox-circle-line text-green-600 text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-green-800 text-sm">Demande envoyée avec succès !</p>
                      <p className="text-green-600 text-xs mt-1">Votre dossier a été transmis au bureau national de TALKS. Nous vous contacterons dans les 7 jours ouvrables.</p>
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
                  id="adhesion-page-form"
                  className="space-y-6"
                >
                  {/* Section 1 - Identité */}
                  <div>
                    <h4 className="text-xs font-bold text-[#003082] uppercase tracking-widest mb-4 flex items-center gap-2">
                      <i className="ri-user-line" />
                      Informations Personnelles
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="nom"
                          required
                          placeholder="Votre nom de famille"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Prénom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="prenom"
                          required
                          placeholder="Votre prénom"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="votre@email.com"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Téléphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="telephone"
                          required
                          placeholder="+236 75 00 00 00"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Date de naissance
                        </label>
                        <input
                          type="date"
                          name="date_naissance"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Sexe
                        </label>
                        <select
                          name="sexe"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors cursor-pointer"
                        >
                          <option value="">Sélectionner</option>
                          <option value="Masculin">Masculin</option>
                          <option value="Féminin">Féminin</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2 - Localisation */}
                  <div>
                    <h4 className="text-xs font-bold text-[#003082] uppercase tracking-widest mb-4 flex items-center gap-2">
                      <i className="ri-map-pin-line" />
                      Localisation
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Préfecture d'Origine <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="region"
                          required
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors cursor-pointer"
                        >
                          <option value="">Sélectionner votre préfecture d'origine</option>
                          {regions.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Ville / Quartier
                        </label>
                        <input
                          type="text"
                          name="ville"
                          placeholder="Votre ville ou quartier"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3 - Profil */}
                  <div>
                    <h4 className="text-xs font-bold text-[#003082] uppercase tracking-widest mb-4 flex items-center gap-2">
                      <i className="ri-briefcase-line" />
                      Profil Professionnel
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Profession
                        </label>
                        <input
                          type="text"
                          name="profession"
                          placeholder="Votre profession ou activité"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Niveau d'études
                        </label>
                        <select
                          name="niveau_etudes"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors cursor-pointer"
                        >
                          <option value="">Sélectionner</option>
                          <option value="Primaire">Primaire</option>
                          <option value="Secondaire">Secondaire</option>
                          <option value="Baccalauréat">Baccalauréat</option>
                          <option value="Licence">Licence / Bachelor</option>
                          <option value="Master">Master</option>
                          <option value="Doctorat">Doctorat</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 4 - Domaines */}
                  <div>
                    <h4 className="text-xs font-bold text-[#003082] uppercase tracking-widest mb-4 flex items-center gap-2">
                      <i className="ri-focus-3-line" />
                      Domaines d'Engagement
                    </h4>
                    <p className="text-gray-500 text-xs mb-3">Sélectionnez les domaines dans lesquels vous souhaitez contribuer :</p>
                    <div className="flex flex-wrap gap-2">
                      {domaines.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleDomaine(d)}
                          className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                            selectedDomaines.includes(d)
                              ? 'bg-[#003082] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {selectedDomaines.includes(d) && <i className="ri-check-line mr-1" />}
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section 5 - Motivation */}
                  <div>
                    <h4 className="text-xs font-bold text-[#003082] uppercase tracking-widest mb-4 flex items-center gap-2">
                      <i className="ri-heart-line" />
                      Motivation
                    </h4>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Pourquoi souhaitez-vous rejoindre TALKS ? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="motivation"
                        required
                        rows={5}
                        maxLength={500}
                        placeholder="Expliquez votre motivation, vos valeurs et ce que vous souhaitez apporter à l'association..."
                        onChange={(e) => setCharCount(e.target.value.length)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors resize-vertical"
                      />
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-gray-400 text-xs">Maximum 500 caractères</p>
                        <p className={`text-xs font-medium ${charCount > 450 ? 'text-red-500' : 'text-gray-400'}`}>
                          {charCount}/500
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Parrainage */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Nom du parrain (si applicable)
                    </label>
                    <input
                      type="text"
                      name="parrain"
                      placeholder="Nom d'un membre TALKS qui vous parraine"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors"
                    />
                  </div>

                  {/* Engagement */}
                  <div className="bg-[#f8f9ff] rounded-xl p-5 space-y-3">
                    <h4 className="text-xs font-bold text-[#1a2b4a] uppercase tracking-wide mb-3">Engagements</h4>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="reglement" required className="mt-1 cursor-pointer" />
                      <span className="text-xs text-gray-600 leading-relaxed">
                        J'accepte le <a href="#" className="text-[#003082] underline">règlement intérieur</a> de l'association TALKS et m'engage à respecter ses valeurs. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="valeurs" required className="mt-1 cursor-pointer" />
                      <span className="text-xs text-gray-600 leading-relaxed">
                        Je m'engage à défendre les valeurs de paix, de discipline, de respect mutuel et d'engagement patriotique. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="confidentialite" className="mt-1 cursor-pointer" />
                      <span className="text-xs text-gray-600 leading-relaxed">
                        J'accepte que mes données soient utilisées conformément à la <a href="#" className="text-[#003082] underline">politique de confidentialité</a> de TALKS.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="whitespace-nowrap w-full bg-[#003082] text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:bg-[#1a2b4a] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-base cursor-pointer"
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <span className="text-[#003082] text-xs font-bold uppercase tracking-widest">FAQ</span>
            <h2 className="text-[#1a2b4a] font-extrabold text-2xl mt-2">Questions Fréquentes</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Qui peut adhérer à TALKS ?', a: 'Toute personne centrafricaine ou amie de la Centrafrique, partageant les valeurs de paix, de développement et de soutien aux actions du Président Touadéra peut adhérer à TALKS.' },
              { q: 'L\'adhésion est-elle payante ?', a: 'L\'adhésion à TALKS est symbolique. Des cotisations annuelles modestes peuvent être demandées pour soutenir les activités de l\'association.' },
              { q: 'Combien de temps prend le traitement de ma demande ?', a: 'Le comité d\'admission examine les dossiers sous 7 jours ouvrables. Vous serez contacté par email ou téléphone pour confirmation.' },
              { q: 'Puis-je adhérer depuis la diaspora ?', a: 'Absolument ! TALKS accueille les membres de la diaspora centrafricaine du monde entier. Sélectionnez "Autre (Diaspora)" dans le champ Région.' },
              { q: 'Quels sont mes droits en tant que membre ?', a: 'En tant que membre, vous avez accès aux événements, formations, et pouvez participer aux votes lors des assemblées générales. Vous recevez également une carte de membre officielle.' },
            ].map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#1a2b4a] text-sm">{question}</span>
        <i className={`ri-arrow-down-s-line text-[#003082] text-lg transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40' : 'max-h-0'}`}>
        <p className="px-5 pb-4 text-gray-500 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
