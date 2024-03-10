import Image from "next/image";
import React from "react";
import { ARTICLE_PATH, BLOG_PATH } from "@/src/utils/constants";
import Link from "next/link";
import { ArticleProperties } from "@/src/types/Article";
import { useLanguage } from "@/src/contexts/TransContext";

const ArticlePreview = ({
    title,
    perex,
    previewImage,
    slug,
}: ArticleProperties) => {
    const [locale] = useLanguage();
    return (
        <div className="column is-one-third is-relative">
            <Link
                href={`/${BLOG_PATH}/${ARTICLE_PATH}/${slug}`}
                locale={locale}
            >
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
            </Link>
            <p className="blog__perex pt-4">{perex}</p>
        </div>
    );
};

export default ArticlePreview;
