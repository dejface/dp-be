import Image from "next/image";
import React from "react";
import { ArticlePreview } from "@/src/types/ArticlePreview";

const ArticlePreview = ({ title, perex, previewImage }: ArticlePreview) => {
    /** TODO: fix url */
    return (
        <div className="column is-one-third is-relative">
            <a href={"https://www.google.sk"}>
                <div className="blog__image overlay">
                    <Image
                        className="blog__image"
                        loading="lazy"
                        src={previewImage.url}
                        alt={`${title} preview image`}
                        width={previewImage.width}
                        height={previewImage.height}
                    />
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
