import React from "react";
import ShowMore from "@/src/components/ShowMore";
import { BLOG_PATH } from "@/src/utils/constants";
import ArticlePreview from "@/src/components/homepage/blog/ArticlePreview";
import { ArticlePreview as ArticlePreviewType } from "@/src/types/Article";
import { useTranslation } from "@/src/contexts/TransContext";

interface BlogSectionProps {
    previews: ArticlePreviewType[];
}

const BlogSection = ({ previews }: BlogSectionProps) => {
    const trans = useTranslation();
    return (
        <section className="blog-section is-paddingless pt-6 pb-6 px-1-mobile pb-2-mobile">
            <div className="level is-mobile is-align-items-baseline mb-4">
                <div className="level-left">
                    <header className="blog-section__title has-text-weight-bold">
                        {trans("app.blog")}
                    </header>
                </div>
                <div className="level-right">
                    <ShowMore
                        href={`/${BLOG_PATH}`}
                        text={trans("app.blog.show_more")}
                        className={"blog-section__link"}
                    />
                </div>
            </div>
            <div className="columns is-multiline is-mobile">
                {previews.map((preview) => (
                    <ArticlePreview
                        key={preview.id}
                        title={preview.title}
                        perex={preview.perex}
                        previewImage={preview.previewImage}
                        slug={preview.slug}
                    />
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
