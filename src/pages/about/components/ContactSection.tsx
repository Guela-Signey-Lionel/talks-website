import { useState, FormEvent } from 'react';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    if (message.length > 500) return;

    setStatus('loading');
    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, value.toString()));

    try {
      await fetch('https://readdy.ai/api/form/d79m071rcamcd36dbjc0', {
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
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">Nous Joindre</span>
          <h2 className="text-[#1a2b4a] font-extrabold mt-2 mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Contactez-nous
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Une question, une suggestion ou souhaitez-vous en savoir plus sur TALKS ? Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="flex flex-col gap-5">
            {[
              { icon: 'ri-map-pin-2-line', label: 'Adresse', value: "Avenue de l'Indépendance, Gobongo D10, BP. : 236, Bangui - République Centrafricaine", color: '#003082' },
              { icon: 'ri-phone-line', label: 'Téléphone', value: '+236 72 26 30 33 / +236 75 40 88 92', color: '#5cb85c' },
              { icon: 'ri-mail-line', label: 'Email', value: 'contact@talks.org / www.talks.com', color: '#d4af37' },
              { icon: 'ri-time-line', label: 'Disponibilité', value: 'Lun – Ven : 8h00 – 17h00', color: '#c0392b' },
            ].map((info, i) => (
              <div key={i} className="bg-[#f8f9fc] rounded-xl p-5 flex items-center gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl shrink-0"
                  style={{ backgroundColor: `${info.color}15` }}
                >
                  <i className={`${info.icon} text-xl`} style={{ color: info.color }} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">{info.label}</p>
                  <p className="text-[#1a2b4a] font-semibold text-sm">{info.value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-[#f8f9fc] rounded-xl p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Réseaux Sociaux</p>
              <div className="flex gap-3">
                {[
                  { icon: 'ri-facebook-fill', color: '#1877f2' },
                  { icon: 'ri-linkedin-fill', color: '#0A66C2' },
                  { icon: 'ri-youtube-fill', color: '#ff0000' },
                  { icon: 'ri-whatsapp-fill', color: '#25d366' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 cursor-pointer"
                    style={{ backgroundColor: `${s.color}15` }}
                  >
                    <i className={`${s.icon} text-base`} style={{ color: s.color }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-[#f8f9fc] rounded-2xl p-8">
            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-green-700">
                <i className="ri-checkbox-circle-line text-xl" />
                <p className="text-sm font-semibold">Message envoyé ! Nous vous répondrons rapidement.</p>
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
              id="contact-form"
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
                    placeholder="Votre nom"
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

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Sujet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sujet"
                  required
                  placeholder="Objet de votre message"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  maxLength={500}
                  placeholder="Votre message..."
                  onChange={(e) => setCharCount(e.target.value.length)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#003082] focus:ring-1 focus:ring-[#003082]/20 transition-colors bg-white resize-vertical"
                />
                <p className={`text-xs mt-1 text-right ${charCount > 450 ? 'text-red-500' : 'text-gray-400'}`}>
                  {charCount}/500 caractères
                </p>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="whitespace-nowrap w-full bg-[#003082] text-white font-bold py-4 rounded-xl hover:bg-[#1a2b4a] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line" />
                    Envoyer le Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* GPS Map - Siège Coordination Nationale */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#003082]/10">
              <i className="ri-map-pin-2-line text-[#003082] text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-[#1a2b4a] text-lg">Localisation du Siège</h3>
              <p className="text-gray-500 text-sm">Avenue de l'Indépendance, Gobongo D10 - BP. : 236, Bangui - République Centrafricaine</p>
            </div>
          </div>
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-200">
            <iframe
              title="Siège TALKS - Bangui Gobongo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15929.123456789!2d18.5582!3d4.3947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1063f5b5b5b5b5b5%3A0x1063f5b5b5b5b5b5!2sGobongo%2C%20Bangui%2C%20Central%20African%20Republic!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <i className="ri-map-pin-line text-[#003082]" />
              <span>Avenue de l'Indépendance, Gobongo D10 - BP. : 236, Bangui - République Centrafricaine</span>
            </div>
            <a
              href="https://maps.google.com/?q=Gobongo,Bangui,Central+African+Republic"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="whitespace-nowrap flex items-center gap-1.5 text-[#003082] font-semibold hover:underline cursor-pointer"
            >
              <i className="ri-external-link-line" />
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
