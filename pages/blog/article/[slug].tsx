import { fetchArticleBySlug } from "@/src/api/fetch";
import { ArticleContent } from "@/src/types/Article";
import React, { useEffect } from "react";
import Layout from "@/src/components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { RichTextContentParser } from "@/src/parsers/RichTextContentParser";
import { generateStaticPropsForSlugs } from "@/src/utils/generateStaticPropsForSlugs";
import { generateStaticPathsForSlugs } from "@/src/utils/generateStaticPathsForSlugs";
import { ArticleSlugsQuery } from "@/src/queries/ArticleSlugsQuery";
import { SlugPair, SlugProps } from "@/src/types/Slugs";
import { useArticleSlugs } from "@/src/contexts/ArticleSlugsContext";

interface ArticleWrapperProps {
    parsedContent: ArticleContent;
    slugs: SlugPair[];
}

const ArticleWrapper = ({ parsedContent, slugs }: ArticleWrapperProps) => {
    const router = useRouter();
    const [, setSlugs] = useArticleSlugs();

    useEffect(() => {
        setSlugs(slugs);
    }, [slugs]);

    if (!parsedContent || router.isFallback) {
        return <div>Loading...</div>;
    }

    const parsedRichText = RichTextContentParser(parsedContent.content);

    return (
        <Layout>
            <div className="container px-1-mobile">
                <div className="columns is-centered">
                    <div className="column is-12">
                        <div className="blog__article">
                            <div className="blog__article__image is-flex is-justify-content-center pt-5 pb-6 pb-3-mobile pt-3-mobile">
                                <Image
                                    src={parsedContent.previewImage.url}
                                    alt={"alt"}
                                    width={parsedContent.previewImage.width}
                                    height={parsedContent.previewImage.height}
                                />
                            </div>
                            <div className="blog__article__title">
                                <h1 className="title is-size-3 is-size-5-mobile has-text-left">
                                    {parsedContent.title}
                                </h1>
                            </div>
                            <div className="blog__article__perex has-text-weight-medium is-size-6 is-size-6-mobile pt-5 pb-3">
                                <p>{parsedContent.perex}</p>
                            </div>
                            <div className="blog__article__content is-size-7-mobile">
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
    return generateStaticPathsForSlugs(ArticleSlugsQuery);
}

export async function getStaticProps({ params, locale }: SlugProps) {
    return generateStaticPropsForSlugs(
        () => fetchArticleBySlug(params.slug, locale),
        ArticleSlugsQuery,
    );
}

export default ArticleWrapper;
