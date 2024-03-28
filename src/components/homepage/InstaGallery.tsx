import React from "react";
import Image from "next/image";
import { InstaPost } from "@/src/types/InstaPost";
import { useTranslation } from "@/src/contexts/TransContext";

interface InstaGalleryProps {
    instaPosts: InstaPost[];
}

const InstaGallery = ({ instaPosts }: InstaGalleryProps) => {
    const trans = useTranslation();

    return (
        <section className="section pt-4 pb-3 pb-2-mobile is-small is-paddingless px-1-mobile">
            <h1 className="insta__section-title is-marginless pb-5">
                {trans("app.instagram_gallery.title")}
            </h1>
            <div className="insta-gallery">
                {instaPosts.map((post, index) => (
                    <div key={index}>
                        <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="image-wrapper">
                                <Image
                                    className="insta__image"
                                    src={post.image.url}
                                    alt="Instagram post"
                                    layout="fill"
                                />
                            </div>
                            <figcaption className="insta__caption is-hidden-mobile">
                                {post.caption}
                            </figcaption>
                            <figcaption className="insta__author is-hidden-mobile">
                                {post.author}
                            </figcaption>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InstaGallery;
