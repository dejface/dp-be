import { fetchArticleBySlug, fetchArticleSlugs } from "@/src/api/fetch";
import { ArticleParser } from "@/src/parsers/ArticleParser";
import { ArticleContent } from "@/src/types/Article";
import React from "react";
import Layout from "@/src/components/Layout";
import Image from "next/image";
import { useRichTextContentParser } from "@/src/hooks/useRichTextContentParser";

interface SlugProps {
    params: {
        slug: string;
    };
}

interface ArticleWrapperProps {
    parsedArticle: ArticleContent;
}

const ArticleWrapper = ({ parsedArticle }: ArticleWrapperProps) => {
    const parsedRichText = useRichTextContentParser(parsedArticle.content);
    return (
        <Layout>
            <div className="container px-1-mobile">
                <div className="columns is-centered">
                    <div className="column is-10">
                        <div className="blog__article">
                            <div className="blog__article__title">
                                <h1 className="title is-size-3 is-size-4-mobile has-text-left pt-4 pb-3-mobile pb-5">
                                    {parsedArticle.title}
                                </h1>
                            </div>
                            <div className="blog__article__image is-flex is-justify-content-center">
                                <Image
                                    src={parsedArticle.previewImage.url}
                                    alt={"alt"}
                                    width={parsedArticle.previewImage.width}
                                    height={parsedArticle.previewImage.height}
                                />
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

    const paths = articleSlugs.map((slug: string) => {
        return { params: { slug } };
    });

    return {
        paths,
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }: SlugProps) {
    let parsedArticle = null;
    const article = await fetchArticleBySlug(params.slug);

    if (!article) {
        return {
            notFound: true,
        };
    }
    parsedArticle = ArticleParser(article);

    return {
        props: {
            parsedArticle,
        },
    };
}

export default ArticleWrapper;
