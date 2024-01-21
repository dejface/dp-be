import React from "react";
import ArticlePreview from "@/src/components/ArticlePreview";
import { ArticlePreview as ArticlePreviewType } from "@/src/types/ArticlePreview";

interface BlogSectionProps {
    previews: ArticlePreviewType[];
}

const BlogSection = ({ previews }: BlogSectionProps) => {
    return (
        <section className="blog__section is-paddingless pt-6 pb-6 px-1-mobile">
            <div className="level is-mobile">
                <div className="level-left">
                    <header className="title is-3 has-text-weight-bold">
                        Blog
                    </header>
                </div>
                <div className="level-right">
                    <p>Show all articles</p>
                </div>
            </div>
            <div className="columns is-multiline">
                {previews.map((preview, index) => (
                    <ArticlePreview
                        key={index}
                        title={preview.title}
                        perex={preview.perex}
                        previewImage={preview.previewImage}
                    />
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
