import Image from "next/image";
import { getDate } from "@/src/utils/getDate";
import { PiClockThin } from "react-icons/pi";
import React from "react";
import { useTranslation } from "@/src/hooks/useTranslation";
import { ArticlePreview } from "@/src/types/ArticlePreview";
import ShowMore from "@/src/components/ShowMore";

interface BlogPageArticlePreviewProps {
    article: ArticlePreview;
}

const BlogPageArticlePreview = ({ article }: BlogPageArticlePreviewProps) => {
    const trans = useTranslation();
    return (
        <div className="column is-one-third">
            <div className="card is-shadowless blog__article-preview">
                <div className="card-image">
                    <figure className="image is-2by1">
                        <Image
                            src={article.previewImage.url}
                            alt={"alt"}
                            width={article.previewImage.width}
                            height={article.previewImage.height}
                        />
                        <div className="blog__article-preview__overlay">
                            <div className="blog__article-preview__title">
                                <p className="title is-size-6 has-text-centered">
                                    {article.title}
                                </p>
                            </div>
                        </div>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="level is-mobile">
                        <div className="level-left is-italic">
                            <p>{getDate(article.published)}</p>
                        </div>
                        <div className="level-right">
                            <PiClockThin className="mr-1" />
                            <p className="is-italic">{`${
                                article.readTime
                            } ${trans("app.blog.minutes")}`}</p>
                        </div>
                    </div>
                    <p className={"blog__article-preview__perex"}>
                        {article.perex}
                    </p>
                    <div className="is-flex is-align-items-center mt-4">
                        {/*TODO: Add link to blog post*/}
                        <ShowMore
                            href={"https://www.google.sk"}
                            text={trans("app.blog.read_more")}
                            className={"has-text-weight-bold"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPageArticlePreview;
