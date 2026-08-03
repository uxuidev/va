import { Geist, Geist_Mono } from "next/font/google";
import { getDictionary, i18n } from "@/lib/content/i18n";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VA Services | Virtual Assistant Solutions",
  description: "Professional virtual administrative, technical, and operational support.",
};

export async function generateStaticParams() {
  return i18n.locales.map((lan) => ({ lan }));
}

export default async function RootLayout({ children, params }) {
  const { lan } = await params;

  const dict = await getDictionary(lan, "home");
  const footerDictionary = await getDictionary(lan, "footer");

  return (
    <html
      lang={lan}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Header locale={lan} navContent={dict.nav} />
        <div className="flex-1">{children}</div>
        <Footer locale={lan} t={footerDictionary} />
      </body>
    </html>
  );
}