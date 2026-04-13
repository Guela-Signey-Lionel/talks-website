import Ticker from '@/components/feature/Ticker';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import IdeologySection from './components/IdeologySection';
import CoordinationSection from './components/CoordinationSection';
import AdhesionForm from './components/AdhesionForm';
import ContactSection from './components/ContactSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Ticker />
      <Navbar />
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#003082] to-[#1a2b4a] text-white">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://readdy.ai/api/search-image?query=centrafrique%20flag%20pattern%20texture%20patriotic%20background%20abstract%20geometric&width=1920&height=600&seq=about-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <div className="w-20 h-20 rounded-full border-4 border-[#d4af37] overflow-hidden mx-auto mb-6">
            <img
              src="https://static.readdy.ai/image/2cc1fd764c88cec0ebc40aa19f048a3c/c9e868d3a3cb5fa1b41f8635793b908d.jpeg"
              alt="TALKS"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[#d4af37] text-sm font-bold uppercase tracking-wider">À Propos</span>
          <h1 className="text-white text-4xl font-extrabold mb-4 mt-2">
            TALKS - Notre Mouvement
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Découvrez notre mission, nos valeurs, notre organisation et comment rejoindre notre mouvement patriotique pour une Centrafrique forte et unie.
          </p>
        </div>
      </section>

      <main>
        <IdeologySection />
        <CoordinationSection />
        <AdhesionForm />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
