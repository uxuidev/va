import { getDictionary } from "@/lib/content/i18n";
import Portfolio from "./portfolio";

const Page = async ({ params }) => {
    const { lan } = await params;
    const content = await getDictionary(lan, "portfolio");

    return <Portfolio content={{ ...content, category: content.website }} locale={lan} />;
};

export default Page;