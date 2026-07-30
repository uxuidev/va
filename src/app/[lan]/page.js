import { getDictionary } from '@/lib/content/i18n';
import Hero from './home/hero';

export default async function HomePage({ params }) {
  const { lan } = await params;
  const t = await getDictionary(lan, 'home');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <main>
        <Hero content={t.hero} />
      </main>
    </div>
  );
}