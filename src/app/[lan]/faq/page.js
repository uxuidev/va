import FAQ from './faq';
import { getDictionary } from '@/lib/content/i18n';

const Page = async ({ params }) => {
    const { lan } = await params;
    const dictionary = await getDictionary(lan, 'faq');

    return <FAQ content={dictionary.faq} />;
};

export default Page;