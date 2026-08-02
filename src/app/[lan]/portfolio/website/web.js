import Portfolio from "../portfolio";

function Web({ content, locale }) {
    return <Portfolio content={content} category="website" locale={locale} />;
}

export default Web;
