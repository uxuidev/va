import { getDictionary } from "@/lib/content/i18n";
import Graphics from "./graphics";

const GraphicDesign = async ({ params }) => {
    const { lan } = await params;
    const content = await getDictionary(lan, "portfolio");

    return <Graphics content={{ ...content, category: content.designing }} locale={lan} />;
};

export default GraphicDesign;
