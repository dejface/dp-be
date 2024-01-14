import React from "react";
import ArticlePreview from "@/src/components/ArticlePreview";
import useFetchArticlePreviews from "@/src/hooks/useFetchArticlePreviews";

const BlogSection = () => {
    const previews = useFetchArticlePreviews();

    if (!previews.previews) return null;

    return (
        <section className="blog__section is-paddingless pt-6 pb-6">
            <div className="level">
                <div className="level-left">
                    <header className="title is-3 has-text-weight-bold">Blog</header>
                </div>
                <div className="level-right">
                    <p>Show all articles</p>
                </div>
            </div>
            <div className="columns is-multiline">
                {previews.previews.map((preview, index) => (
                    <ArticlePreview key={index} title={preview.title} perex={preview.perex} previewImage={preview.previewImage} />
                ))}
            </div>
        </section>
    );
}

export default BlogSection;