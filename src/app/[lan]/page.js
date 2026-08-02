import { getDictionary } from '@/lib/content/i18n';
import Hero from './home/hero';
import Testimonial from './home/testimonial';

export default async function HomePage({ params }) {
  const { lan } = await params;
  const [homeDictionary, testimonialDictionary] = await Promise.all([
    getDictionary(lan, 'home'),
    getDictionary(lan, 'testimonial'),
  ]);

  return (
    <div className="min-h-screen bg-body-bg">
      <main>
        <Hero t={homeDictionary.hero} language={lan} />
        <Testimonial t={testimonialDictionary} />
      </main>
    </div>
  );
}