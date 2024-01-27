import React from "react";
import Layout from "@/src/components/Layout";
import { fetchArticlePreviews } from "@/src/api/fetch";
import { ArticlePreviewParser } from "@/src/parsers/ArticlePreviewParser";
import BlogPageArticlePreview from "@/src/components/BlogPageArticlePreview";
import { ArticlePreview } from "@/src/types/ArticlePreview";

interface BlogProps {
    parsedArticlePreviews: ArticlePreview[] | null;
}

export async function getStaticProps() {
    let parsedArticlePreviews = null;
    const articlePreviews = await fetchArticlePreviews();
    if (articlePreviews) {
        parsedArticlePreviews = ArticlePreviewParser(articlePreviews);
    }

    return {
        props: {
            parsedArticlePreviews,
        },
    };
}

const Blog = ({ parsedArticlePreviews }: BlogProps) => {
    // TODO: maybe add loading spinner/skeleton/No articles found page
    if (!parsedArticlePreviews) {
        return <div>loading...</div>;
    }

    return (
        <Layout>
            <div className="columns is-multiline mt-2 is-variable is-2">
                {parsedArticlePreviews.map((preview) => (
                    <BlogPageArticlePreview
                        key={preview.id}
                        article={preview}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Blog;
