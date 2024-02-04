import "@/src/styles/globals.scss";
import { AppProps } from "next/app";
import { LanguageProvider } from "@/src/hooks/useTranslation";
import Head from "next/head";
import { ArticleSlugsWithLocaleProvider } from "@/src/hooks/useArticleSlugsWithLocale";

function App({ Component, pageProps }: AppProps) {
    return (
        <LanguageProvider>
            <ArticleSlugsWithLocaleProvider>
                <Head>
                    <title>MILOUI - šperky z chirurgickej ocele</title>
                    <meta
                        name="description"
                        content="Eshop s prvotriednymi šperkami pre ženy"
                    />
                </Head>
                <Component {...pageProps} />
            </ArticleSlugsWithLocaleProvider>
        </LanguageProvider>
    );
}

export default App;
