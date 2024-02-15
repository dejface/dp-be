import {
    ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    BLOG_PATH,
} from "@/src/utils/constants";
import BlogPageArticlePreview from "@/src/components/BlogPageArticlePreview";
import React from "react";
import { SupportedLocale } from "@/src/types/Types";
import PaginatedPageLayout from "@/src/components/PaginatedPageLayout";
import { fetchArticlePreviews, fetchTotalArticleCount } from "@/src/api/fetch";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
import { generateStaticPaths } from "@/src/utils/generateStaticPaths";
import { ArticlePageProps, StaticProps } from "@/src/types/Page";
import Layout from "@/src/components/Layout";

const BlogPaginatedPage = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ArticlePageProps) => {
    // TODO: maybe add loading spinner/skeleton/No articles found page
    if (!fetchedItems) {
        return <div>loading...</div>;
    }

    const articlePreviewComponent = (
        <BlogPageArticlePreview
            articles={fetchedItems}
            totalPages={totalPages}
            currentPage={currentPage}
        />
    );

    return (
        <Layout>
            <PaginatedPageLayout
                itemComponent={articlePreviewComponent}
                totalPages={totalPages}
                currentPage={currentPage}
                paginationPath={`/${BLOG_PATH}`}
            />
        </Layout>
    );
};

export async function getStaticPaths() {
    return generateStaticPaths(
        fetchTotalArticleCount,
        ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    );
}

export async function getStaticProps({
    params,
    locale,
}: StaticProps<number, SupportedLocale>) {
    return generateStaticProps(
        fetchArticlePreviews,
        locale,
        params.page,
        ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    );
}

export default BlogPaginatedPage;
