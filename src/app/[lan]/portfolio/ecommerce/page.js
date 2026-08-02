import { getDictionary } from "@/lib/content/i18n";
import Ecommerce from "./ecommerce";

const EcommerceStore = async ({ params }) => {
    const { lan } = await params;
    const content = await getDictionary(lan, "portfolio");

    return <Ecommerce content={{ ...content, category: content.ecommerce }} locale={lan} />;
};

export default EcommerceStore;
