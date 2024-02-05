import { fetchArticleBySlug, fetchArticleSlugs } from "@/src/api/fetch";
import { ArticleParser } from "@/src/parsers/ArticleParser";
import { ArticleContent } from "@/src/types/Article";
import React, { useEffect } from "react";
import Layout from "@/src/components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useArticleSlugs } from "@/src/hooks/useArticleSlugsWithLocale";
import { SlugPair, SupportedLocale } from "@/src/types/Types";
import { RichTextContentParser } from "@/src/parsers/RichTextContentParser";

interface SlugProps {
    params: {
        slug: string;
        slugs: SlugPair[];
    };
    locale: SupportedLocale;
}

interface ArticleWrapperProps {
    parsedArticle: ArticleContent;
    slugs: SlugPair[];
}

const ArticleWrapper = ({ parsedArticle, slugs }: ArticleWrapperProps) => {
    const router = useRouter();
    const [, setSlugs] = useArticleSlugs();

    useEffect(() => {
        setSlugs(slugs);
    }, [slugs]);

    if (!parsedArticle || router.isFallback) {
        return <div>Loading...</div>;
    }

    const parsedRichText = RichTextContentParser(parsedArticle.content);

    return (
        <Layout>
            <div className="container px-1-mobile">
                <div className="columns is-centered">
                    <div className="column is-12">
                        <div className="blog__article">
                            <div className="blog__article__image is-flex is-justify-content-center pt-5 pb-6 pb-3-mobile pt-3-mobile">
                                <Image
                                    src={parsedArticle.previewImage.url}
                                    alt={"alt"}
                                    width={parsedArticle.previewImage.width}
                                    height={parsedArticle.previewImage.height}
                                />
                            </div>
                            <div className="blog__article__title">
                                <h1 className="title is-size-3 is-size-4-mobile has-text-left pb-2-mobile">
                                    {parsedArticle.title}
                                </h1>
                            </div>
                            <div className="blog__article__perex has-text-weight-medium is-size-6 pt-5 pb-3">
                                <p>{parsedArticle.perex}</p>
                            </div>
                            <div className="blog__article__content">
                                {parsedRichText}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const articleSlugs = await fetchArticleSlugs();

    const paths = [
        ...articleSlugs.slugsCZ.map((slug: string) => ({
            params: { slug },
            locale: "cs",
        })),
        ...articleSlugs.slugsSK.map((slug: string) => ({
            params: { slug },
            locale: "sk",
        })),
    ];

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params, locale }: SlugProps) {
    const article = await fetchArticleBySlug(params.slug, locale);
    const articleSlugs = await fetchArticleSlugs();

    if (!article) {
        return {
            notFound: true,
        };
    }

    const parsedArticle = ArticleParser(article);
    const mergedSlugs = articleSlugs.slugsCZ.map((slugCz: string, index) => {
        return {
            cs: slugCz,
            sk: articleSlugs.slugsSK[index],
        };
    });

    return {
        props: {
            parsedArticle,
            slugs: mergedSlugs,
        },
        revalidate: 1,
    };
}

export default ArticleWrapper;
