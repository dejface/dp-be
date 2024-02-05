import React from "react";
import BlogPageArticlePreview from "@/src/components/BlogPageArticlePreview";
import { BLOG_PATH } from "@/src/utils/constants";
import { BlogProps, PaginatedStaticProps } from "@/src/types/Types";
import PaginatedPageLayout from "@/src/components/PaginatedPageLayout";
import { generateStaticProps } from "@/src/utils/blog/generateStaticProps";

const BlogIndex = ({
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

export async function getStaticProps({ locale }: PaginatedStaticProps) {
    return generateStaticProps(locale, 1);
}

export default BlogIndex;
