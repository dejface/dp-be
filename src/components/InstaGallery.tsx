import React from "react";
import {useTranslation} from "@/src/hooks/useTranslation";
import useFetchInstaPosts from "@/src/hooks/useFetchInstaPosts";
import Image from "next/image";

const determineSectionSize = (postCount: number): string => {
    if (postCount === 4) {
        return "is-3";
    } else if (postCount === 5) {
        return "is-2 insta-gallery";
    } else if (postCount === 6) {
        return "is-2";
    }
    return "";
}

const InstaGallery = () => {
    const trans = useTranslation();
    const instaPosts = useFetchInstaPosts();
    const sectionSize = instaPosts.posts ? determineSectionSize(instaPosts.posts.length) : "";

    return (
        <section className="section ml-3 pt-6 is-small is-paddingless">
            <h1 className="title pb-3 top-product-title">{trans('app.instagram_gallery.title')}</h1>
            <div className="columns is-mobile">
                {instaPosts.posts && instaPosts.posts.map((post, index) => (
                    <div className={`column ${sectionSize} is-paddingless`} key={index}>
                        <a href={post.url} target="_blank" rel="noopener noreferrer">
                            <figure className="image is-square mr-3">
                                <Image className="insta-image" src={post.image.url} alt="Instagram post" width={post.image.width} height={post.image.height} />
                                <figcaption className="insta-caption">{post.caption}</figcaption>
                                <figcaption className="insta-author">{post.author}</figcaption>
                            </figure>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}


export default InstaGallery;