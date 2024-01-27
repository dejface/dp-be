import React from "react";
import { ArticlePreview as ArticlePreviewType } from "@/src/types/ArticlePreview";
import ArticlePreview from "@/src/components/blog/ArticlePreview";
import { useTranslation } from "@/src/hooks/useTranslation";
import ShowMore from "@/src/components/ShowMore";

interface BlogSectionProps {
    previews: ArticlePreviewType[];
}

const BlogSection = ({ previews }: BlogSectionProps) => {
    const trans = useTranslation();
    return (
        <section className="blog__section is-paddingless pt-6 pb-6 px-1-mobile">
            <div className="level is-mobile is-align-items-baseline">
                <div className="level-left">
                    <header className="title is-3 has-text-weight-bold">
                        {trans("app.blog.title")}
                    </header>
                </div>
                <div className="level-right">
                    <ShowMore
                        href={"https://google.sk"}
                        text={trans("app.blog.show_more")}
                    />
                </div>
            </div>
            <div className="columns is-multiline">
                {previews.map((preview) => (
                    <ArticlePreview
                        key={preview.id}
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
