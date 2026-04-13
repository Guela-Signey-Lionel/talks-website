import Ticker from '@/components/feature/Ticker';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import HeroSection from './components/HeroSection';
import AboutPreview from './components/AboutPreview';
import NewsPreview from './components/NewsPreview';
import ActivitiesSection from './components/ActivitiesSection';
import CulturalActivitiesSection from './components/CulturalActivitiesSection';
import GallerySection from './components/GallerySection';
import InvestitureSection from './components/InvestitureSection';
import CagnotteSection from './components/CagnotteSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Ticker />
      <Navbar />
      <main>
        <HeroSection />
        <InvestitureSection />
        <AboutPreview />
        <NewsPreview />
        <ActivitiesSection />
        <CulturalActivitiesSection />
        <GallerySection />
        <CagnotteSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
