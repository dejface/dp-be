import type {Metadata} from 'next'
import '@/src/styles/globals.scss'
import {AppProps} from "next/app";
import Layout from "@/src/Layout";
import {LanguageProvider} from "@/src/hooks/useTranslation";

export const metadata: Metadata = {
    title: 'Miloui.sk - šperky z chirurgickej ocele',
    description: 'Eshop s prvotriednymi šperkami pre ženy',
}

function App({ Component, pageProps }: AppProps) {
    return (
        <LanguageProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </LanguageProvider>
    );
}

export default App;
