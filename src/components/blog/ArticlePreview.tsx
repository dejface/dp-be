import Image from "next/image";
import React from "react";
import { ArticleProperties } from "@/src/types/ArticlePreview";
import { ARTICLE_PATH, BLOG_PATH } from "@/src/utils/constants";

const ArticlePreview = ({
    title,
    perex,
    previewImage,
    slug,
}: ArticleProperties) => {
    return (
        <div className="column is-one-third is-relative">
            <a href={`/${BLOG_PATH}/${ARTICLE_PATH}/${slug}`}>
                <div className="blog__image">
                    <figure className="image is-3by2">
                        <Image
                            className="blog__image"
                            loading="lazy"
                            src={previewImage.url}
                            alt={`${title} preview image`}
                            width={previewImage.width}
                            height={previewImage.height}
                        />
                    </figure>
                    <p className="blog__title has-text-centered has-text-weight-bold is-size-5">
                        {title}
                    </p>
                </div>
            </a>
            <p className="blog__perex pt-4">{perex}</p>
        </div>
    );
};

export default ArticlePreview;
