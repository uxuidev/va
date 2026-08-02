import { getDictionary } from "@/lib/content/i18n";
import Visualization from "./visualization";

const DataVisualization = async ({ params }) => {
    const { lan } = await params;
    const content = await getDictionary(lan, "portfolio");

    return <Visualization content={{ ...content, category: content.visualization }} locale={lan} />;
};

export default DataVisualization;
