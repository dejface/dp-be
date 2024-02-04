import {
    ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    BLOG_PATH,
    LOCALE_CS,
    LOCALE_SK,
} from "@/src/utils/constants";
import { fetchArticlePreviews, fetchTotalArticleCount } from "@/src/api/fetch";
import BlogPageArticlePreview from "@/src/components/BlogPageArticlePreview";
import Layout from "@/src/components/Layout";
import React from "react";
import { ArticlePreviewParser } from "@/src/parsers/ArticlePreviewParser";
import { BlogProps } from "@/src/pages/blog";
import Pagination from "@/src/components/Pagination";
import { SupportedLocale } from "@/src/types/Types";

interface StaticProps {
    params: {
        page: number;
    };
    locale: SupportedLocale;
}

interface StaticPaths {
    params: {
        page: string;
    };
    locale: string;
}

const BlogPaginatedPage = ({
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

export async function getStaticPaths() {
    const totalPosts = await fetchTotalArticleCount();
    const totalPages = Math.ceil(totalPosts / ARTICLE_COUNT_BLOG_PAGE_LIMIT);

    const paths: StaticPaths[] = [];

    for (let page = 2; page <= totalPages; page++) {
        [LOCALE_CS, LOCALE_SK].forEach((locale) => {
            paths.push({ params: { page: page.toString() }, locale });
        });
    }

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params, locale }: StaticProps) {
    let parsedArticlePreviews = null;
    const articlePreviews = await fetchArticlePreviews(
        ARTICLE_COUNT_BLOG_PAGE_LIMIT,
        locale,
        params.page,
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
            currentPage: params.page,
        },
    };
}

export default BlogPaginatedPage;
