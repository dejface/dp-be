import {
    ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    BLOG_PATH,
} from "@/src/utils/constants";
import BlogPageArticlePreview from "@/src/components/BlogPageArticlePreview";
import React from "react";
import { SupportedLocale } from "@/src/types/Types";
import { fetchArticlePreviews, fetchTotalArticleCount } from "@/src/api/fetch";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
import { generateStaticPaths } from "@/src/utils/generateStaticPaths";
import { ArticlePageProps, StaticProps } from "@/src/types/Page";
import Layout from "@/src/components/Layout";
import NumberedPagination from "@/src/components/pagination/NumberedPagination";
import PaginatedPageLayout from "@/src/components/pagination/PaginatedPageLayout";

const BlogPaginatedPage = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ArticlePageProps) => {
    // TODO: maybe add loading spinner/skeleton/No articles found page
    if (!fetchedItems) {
        return <div>loading...</div>;
    }

    return (
        <Layout>
            <PaginatedPageLayout
                itemComponent={
                    <BlogPageArticlePreview articles={fetchedItems} />
                }
                paginationComponent={
                    <NumberedPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        path={`/${BLOG_PATH}`}
                    />
                }
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
