import { getDictionary } from "@/lib/content/i18n";
import Web from "./web";

const Websites = async ({ params }) => {
    const { lan } = await params;
    const content = await getDictionary(lan, "portfolio");

    return <Web content={{ ...content, category: content.website }} locale={lan} />;
};

export default Websites;
