import { ARTICLE_COUNT_BLOG_PAGE_LIMIT } from "@/src/utils/constants";
import { fetchArticlePreviews, fetchTotalArticleCount } from "@/src/api/fetch";
import BlogPageArticlePreview from "@/src/components/BlogPageArticlePreview";
import Layout from "@/src/components/Layout";
import React from "react";
import { ArticlePreviewParser } from "@/src/parsers/ArticlePreviewParser";
import { BlogProps } from "@/src/pages/blog";
import Pagination from "@/src/components/Pagination";

interface Params {
    page: number;
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
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </Layout>
    );
};

export async function getStaticPaths() {
    const totalPosts = await fetchTotalArticleCount();
    const totalPages = Math.ceil(totalPosts / ARTICLE_COUNT_BLOG_PAGE_LIMIT);

    const paths = [];

    for (let page = 2; page <= totalPages; page++) {
        paths.push({ params: { page: page.toString() } });
    }

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: Params }) {
    let parsedArticlePreviews = null;
    const articlePreviews = await fetchArticlePreviews(
        ARTICLE_COUNT_BLOG_PAGE_LIMIT,
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
