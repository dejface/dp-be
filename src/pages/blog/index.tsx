import React from "react";
import BlogPageArticlePreview from "@/src/components/BlogPageArticlePreview";
import {
    ARTICLE_COUNT_BLOG_PAGE_LIMIT,
    BLOG_PATH,
} from "@/src/utils/constants";
import { SupportedLocale } from "@/src/types/Types";
import PaginatedPageLayout from "@/src/components/PaginatedPageLayout";
import { fetchArticlePreviews } from "@/src/api/fetch";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
import { ArticlePageProps, StaticProps } from "@/src/types/Page";
import Layout from "@/src/components/Layout";

const BlogIndex = ({
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
