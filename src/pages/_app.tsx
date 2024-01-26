import "@/src/styles/globals.scss";
import { AppProps } from "next/app";
import { LanguageProvider } from "@/src/hooks/useTranslation";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
    return (
        <LanguageProvider>
            <Head>
                <title>MILOUI - šperky z chirurgickej ocele</title>
                <meta
                    name="description"
                    content="Eshop s prvotriednymi šperkami pre ženy"
                />
            </Head>
            <Component {...pageProps} />
        </LanguageProvider>
    );
}

export default App;
