import React from "react";
import {
    ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    BLOG_PATH,
} from "@/src/utils/constants";
import { SupportedLocale } from "@/src/types/Types";
import { fetchArticlePreviews } from "@/src/api/fetch";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
import { ArticlePageProps, StaticProps } from "@/src/types/Page";
import Layout from "@/src/components/Layout";
import NumberedPagination from "@/src/components/pagination/NumberedPagination";
import PaginatedPageLayout from "@/src/components/pagination/PaginatedPageLayout";
import BlogPageLayout from "@/src/components/page/BlogPageLayout";

const BlogIndex = ({
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

export async function getStaticProps({
    locale,
}: StaticProps<number, SupportedLocale>) {
    return generateStaticProps(
        fetchArticlePreviews,
        locale,
        1,
        ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    );
}

export default BlogIndex;
