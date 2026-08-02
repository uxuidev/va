import { getDictionary } from "@/lib/content/i18n";
import SocialMedia from "./socialmedia";

const SocialMediaPage = async ({ params }) => {
    const { lan } = await params;
    const content = await getDictionary(lan, "portfolio");

    return <SocialMedia content={{ ...content, category: content.socialmedia }} locale={lan} />;
};

export default SocialMediaPage;
