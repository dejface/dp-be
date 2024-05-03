import React from "react";
import Image from "next/image";
import { InstaPost } from "@/src/types/InstaPost";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";
import Link from "next/link";

interface InstaGalleryProps {
    instaPosts: InstaPost[];
}

const InstaGallery = ({ instaPosts }: InstaGalleryProps) => {
    const trans = useTranslation();
    const [locale] = useLanguage();

    return (
        <section className="section pt-4 pb-3 pb-2-mobile is-small is-paddingless px-1-mobile">
            <h1 className="insta__section-title is-marginless pb-5">
                {trans("app.instagram_gallery.title")}
            </h1>
            <div className="insta-gallery">
                {instaPosts.map((post, index) => (
                    <div key={index}>
                        <Link href={post.url}>
                            <div className="image-wrapper">
                                <Image
                                    className="insta__image"
                                    src={post.image.url}
                                    alt="Instagram post"
                                    fill={true}
                                />
                            </div>
                            <figcaption className="insta__caption is-hidden-mobile">
                                {post.caption}
                            </figcaption>
                            <figcaption className="insta__author is-hidden-mobile">
                                {post.author}
                            </figcaption>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InstaGallery;
