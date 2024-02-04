import React from "react";
import Layout from "@/src/components/Layout";
import { fetchArticlePreviews } from "@/src/api/fetch";
import { ArticlePreviewParser } from "@/src/parsers/ArticlePreviewParser";
import BlogPageArticlePreview from "@/src/components/BlogPageArticlePreview";
import { ArticlePreview } from "@/src/types/ArticlePreview";
import {
    ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    BLOG_PATH,
} from "@/src/utils/constants";
import Pagination from "@/src/components/Pagination";
import { SupportedLocale } from "@/src/types/Types";

export interface BlogProps {
    parsedArticlePreviews: ArticlePreview[] | null;
    totalPages: string;
    currentPage: string;
}

interface StaticProps {
    locale: SupportedLocale;
}

export async function getStaticProps({ locale }: StaticProps) {
    let parsedArticlePreviews = null;
    const articlePreviews = await fetchArticlePreviews(
        ARTICLE_COUNT_BLOG_PAGE_LIMIT,
        locale,
    );
    if (articlePreviews) {
        parsedArticlePreviews = ArticlePreviewParser(articlePreviews);
    }
    const totalPages = Math.ceil(
        articlePreviews.data.articleCollection.total /
            ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    );

    return {
        props: {
            parsedArticlePreviews,
            totalPages,
            currentPage: "1",
        },
    };
}

const BlogIndex = ({
    parsedArticlePreviews,
    totalPages,
    currentPage,
}: BlogProps) => {
    // TODO: maybe add loading spinner/skeleton/No articles found page
    if (!parsedArticlePreviews) {
        return <div>loading...</div>;
    }

    return (
        <Layout>
            <div className="columns is-multiline mt-2 is-variable is-2">
                <BlogPageArticlePreview
                    articles={parsedArticlePreviews}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                path={`/${BLOG_PATH}`}
            />
        </Layout>
    );
};

export default BlogIndex;
