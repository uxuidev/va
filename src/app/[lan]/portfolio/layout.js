import { BarChart3, Globe2, Paintbrush, Share2, ShoppingBag } from "lucide-react";
import { getDictionary } from "@/lib/content/i18n";

const tabs = [
    { id: "website", icon: Globe2 },
    { id: "socialmedia", icon: Share2 },
    { id: "ecommerce", icon: ShoppingBag },
    { id: "designing", icon: Paintbrush },
    { id: "visualization", icon: BarChart3 },
];

export default async function PortfolioLayout({ children, params }) {
    const { lan } = await params;
    const content = await getDictionary(lan, "portfolio");

    return (
        <section className="bg-section-alpha py-10 sm:py-14">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
                    <h1 className="text-3xl font-black text-heading-color sm:text-4xl">{content.title}</h1>
                    <p className="mt-3 text-sm leading-6 text-text-muted sm:text-base">{content.subtitle}</p>
                </header>
                <nav aria-label={content.navigation} className="mb-8 overflow-x-auto pb-2 sm:mb-10">
                    <ul className="mx-auto flex w-fit min-w-max items-center gap-1 rounded-md border border-header-border bg-section-beta p-1.5 shadow-sm">
                        {tabs.map(({ id, icon: Icon }) => (
                            <li key={id}>
                                <a
                                    href={`/${lan}/portfolio/${id}`}
                                    className="flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-text-main transition-colors hover:bg-accent-color hover:text-body-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color sm:px-4"
                                >
                                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                                    <span>{content.tabs[id]}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>{children}</div>
            </div>
        </section>
    );
}
