import { BLOG_PATH } from "@/src/utils/constants";
import BlogPageArticlePreview from "@/src/components/BlogPageArticlePreview";
import React from "react";
import { BlogProps, PaginatedStaticProps } from "@/src/types/Types";
import PaginatedPageLayout from "@/src/components/PaginatedPageLayout";
import { generateStaticProps } from "@/src/utils/blog/generateStaticProps";
import { generateStaticPaths } from "@/src/utils/blog/generateStaticPaths";

const BlogPaginatedPage = ({
    parsedArticlePreviews,
    totalPages,
    currentPage,
}: BlogProps) => {
    // TODO: maybe add loading spinner/skeleton/No articles found page
    if (!parsedArticlePreviews) {
        return <div>loading...</div>;
    }

    const articlePreviewComponent = (
        <BlogPageArticlePreview
            articles={parsedArticlePreviews}
            totalPages={totalPages}
            currentPage={currentPage}
        />
    );

    return (
        <PaginatedPageLayout
            itemComponent={articlePreviewComponent}
            totalPages={totalPages}
            currentPage={currentPage}
            paginationPath={`/${BLOG_PATH}`}
        />
    );
};

export async function getStaticPaths() {
    return generateStaticPaths();
}

export async function getStaticProps({ params, locale }: PaginatedStaticProps) {
    return generateStaticProps(locale, params.page);
}

export default BlogPaginatedPage;
