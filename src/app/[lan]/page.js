import { getDictionary } from '@/lib/content/i18n';
import Hero from './home/hero';
import Services from './home/services';
import Testimonial from './home/testimonial';
import Partners from './home/partners';
import Contact from './home/contact';
import Separator from '@/components/separator';

export default async function HomePage({ params }) {
  const { lan } = await params;
  const homeDictionary = await getDictionary(lan, 'home');

  return (
    <div className="min-h-screen bg-body-bg">
      <main>
        <Hero t={homeDictionary.hero} language={lan} />
        <Separator />
        <Services t={homeDictionary.services} />
        <Separator />
        <Testimonial t={homeDictionary.testimonial} />
        <Separator />
        <Partners t={homeDictionary.partners} />
        <Separator />
        <Contact t={homeDictionary.contact} />
      </main>
    </div>
  );
}