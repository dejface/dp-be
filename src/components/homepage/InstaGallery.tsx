import React from "react";
import Image from "next/image";
import { InstaPost } from "@/src/types/InstaPost";
import { useTranslation } from "@/src/contexts/TransContext";
import classNames from "classnames";

interface InstaGalleryProps {
    instaPosts: InstaPost[];
}

const determineSectionSize = (postCount: number): string => {
    if (postCount === 4) {
        return "is-3";
    } else if (postCount === 5) {
        return "is-2 insta__gallery";
    } else if (postCount === 6) {
        return "is-2";
    }
    return "";
};

const InstaGallery = ({ instaPosts }: InstaGalleryProps) => {
    const trans = useTranslation();
    const sectionSize = determineSectionSize(instaPosts.length);

    return (
        <section className="section pt-4 pb-6 pb-2-mobile is-small is-paddingless px-1-mobile">
            <h1 className="insta__section-title is-marginless pb-5">
                {trans("app.instagram_gallery.title")}
            </h1>
            <div className="columns is-variable is-2 is-mobile">
                {instaPosts.map((post, index) => (
                    <div
                        className={`column ${sectionSize} is-paddingless`}
                        key={index}
                    >
                        <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <figure
                                className={classNames("image is-square mr-2", {
                                    "ml-2": index === 0,
                                })}
                            >
                                <Image
                                    className="insta__image"
                                    src={post.image.url}
                                    alt="Instagram post"
                                    width={post.image.width}
                                    height={post.image.height}
                                />
                                <figcaption className="insta__caption is-hidden-mobile">
                                    {post.caption}
                                </figcaption>
                                <figcaption className="insta__author is-hidden-mobile">
                                    {post.author}
                                </figcaption>
                            </figure>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InstaGallery;
