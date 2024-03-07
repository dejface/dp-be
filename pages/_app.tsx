import "@/src/styles/globals.scss";
import { AppProps } from "next/app";
import Head from "next/head";
import { ShoppingCartProvider } from "@/src/contexts/ShoppingCartContext";
import { LanguageProvider } from "@/src/contexts/TransContext";
import { ProductSlugsWithLocaleProvider } from "@/src/contexts/ProductSlugsContext";
import { ArticleSlugsWithLocaleProvider } from "@/src/contexts/ArticleSlugsContext";

function App({ Component, pageProps }: AppProps) {
    return (
        <LanguageProvider>
            <ShoppingCartProvider>
                <ArticleSlugsWithLocaleProvider>
                    <ProductSlugsWithLocaleProvider>
                        <Head>
                            <title>MILOUI - šperky z chirurgickej ocele</title>
                            <meta
                                name="description"
                                content="Eshop s prvotriednymi šperkami pre ženy"
                            />
                            <link
                                rel="apple-touch-icon"
                                sizes="180x180"
                                href="/apple-touch-icon.png"
                            />
                            <link rel="icon" href="/favicon.ico" />
                            <link
                                rel="icon"
                                type="image/png"
                                sizes="32x32"
                                href="/favicon-32x32.png"
                            />
                            <link
                                rel="icon"
                                type="image/png"
                                sizes="16x16"
                                href="/favicon-16x16.png"
                            />
                            <link rel="manifest" href="/site.webmanifest" />
                        </Head>
                        <Component {...pageProps} />
                    </ProductSlugsWithLocaleProvider>
                </ArticleSlugsWithLocaleProvider>
            </ShoppingCartProvider>
        </LanguageProvider>
    );
}

export default App;
