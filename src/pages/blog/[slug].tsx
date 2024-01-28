import { fetchArticleBySlug, fetchArticleSlugs } from "@/src/api/fetch";
import { ArticleParser } from "@/src/parsers/ArticleParser";
import { ArticleContent } from "@/src/types/Article";
import React from "react";
import Layout from "@/src/components/Layout";
import Image from "next/image";

interface SlugProps {
    params: {
        slug: string;
    };
}

interface ArticleWrapperProps {
    parsedArticle: ArticleContent;
}

const ArticleWrapper = ({ parsedArticle }: ArticleWrapperProps) => {
    return (
        <Layout>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-10">
                        <div className="blog__article">
                            <div className="blog__article__title">
                                <h1 className="title is-size-3 has-text-centered">
                                    {parsedArticle.title}
                                </h1>
                            </div>
                            <div className="blog__article__image">
                                <Image
                                    src={parsedArticle.previewImage.url}
                                    alt={"alt"}
                                    width={parsedArticle.previewImage.width}
                                    height={parsedArticle.previewImage.height}
                                />
                            </div>
                            <div className="blog__article__content">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: parsedArticle.content,
                                    }}
                                />
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
