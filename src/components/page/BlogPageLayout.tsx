import Image from "next/image";
import { getDate } from "@/src/utils/getDate";
import { PiClockThin } from "react-icons/pi";
import React from "react";
import ShowMore from "@/src/components/ShowMore";
import { ARTICLE_PATH, BLOG_PATH } from "@/src/utils/constants";
import { ArticlePreview } from "@/src/types/Article";
import { useTranslation } from "@/src/contexts/TransContext";
import ProductLinkWithImage from "@/src/components/ProductLinkWithImage";
import Link from "next/link";

interface BlogPageLayoutProps {
    articles: ArticlePreview[];
}

const BlogPageLayout = ({ articles }: BlogPageLayoutProps) => {
    const trans = useTranslation();
    return (
        <>
            {articles.map((article) => (
                <div
                    className="column is-one-third-desktop is-one-third-tablet is-full-mobile"
                    key={article.id}
                >
                    <div className="card is-shadowless blog__article-preview">
                        <Link
                            href={`/${BLOG_PATH}/${ARTICLE_PATH}/${article.slug}`}
                        >
                            <div className="card-image">
                                <Image
                                    src={article.previewImage.url}
                                    alt={"alt"}
                                    width={article.previewImage.width}
                                    height={article.previewImage.height}
                                />
                                <div className="blog__article-preview__overlay">
                                    <div className="blog__article-preview__title">
                                        {article.title.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="card-content">
                            <div className="level is-mobile">
                                <div className="level-left is-italic">
                                    <p>{getDate(article.published)}</p>
                                </div>
                                <div className="level-right">
                                    <span>
                                        <PiClockThin
                                            data-testid="clock-icon"
                                            className="blog__article-preview__clock-icon"
                                        />
                                    </span>
                                    <span className="is-italic">{`${
                                        article.readTime
                                    } ${trans("app.blog.minutes")}`}</span>
                                </div>
                            </div>
                            <p className={"blog__article-preview__perex"}>
                                {article.perex}
                            </p>
                            <div className="is-flex is-align-items-center mt-4">
                                <ShowMore
                                    href={`/${BLOG_PATH}/${ARTICLE_PATH}/${article.slug}`}
                                    text={trans("app.blog.read_more")}
                                    className={"has-text-weight-bold"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default BlogPageLayout;
