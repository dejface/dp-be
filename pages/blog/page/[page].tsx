import {
    ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    BLOG_PATH,
} from "@/src/utils/constants";
import React from "react";
import { SupportedLocale } from "@/src/types/Types";
import { fetchArticlePreviews, fetchTotalArticleCount } from "@/src/api/fetch";
import { generateStaticPropsForPagination } from "@/src/utils/generateStaticPropsForPagination";
import { generateStaticPaths } from "@/src/utils/generateStaticPaths";
import { ArticlePageProps, StaticProps } from "@/src/types/Page";
import Layout from "@/src/components/Layout";
import NumberedPagination from "@/src/components/pagination/NumberedPagination";
import PaginatedPageLayout from "@/src/components/pagination/PaginatedPageLayout";
import BlogPageLayout from "@/src/components/page/BlogPageLayout";

const BlogPaginatedPage = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ArticlePageProps) => {
    // TODO: Add loading spinner/skeleton/No articles found page
    if (!fetchedItems) {
        return <div>loading...</div>;
    }

    return (
        <Layout>
            <PaginatedPageLayout
                itemComponent={<BlogPageLayout articles={fetchedItems} />}
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
}: StaticProps<string, SupportedLocale>) {
    return generateStaticPropsForPagination(
        () =>
            fetchArticlePreviews(
                ARTICLE_COUNT_BLOG_PAGE_LIMIT,
                locale,
                parseInt(params.page),
            ),
        parseInt(params.page),
        ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    );
}

export default BlogPaginatedPage;
