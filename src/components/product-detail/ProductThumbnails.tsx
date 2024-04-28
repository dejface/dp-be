import Image from "next/image";
import React from "react";
import { ProductImage } from "@/src/types/Image";

interface ProductThumbnailsProps {
    imageGallery: ProductImage[];
    setSelectedImage: (image: ProductImage) => void;
}

const ProductThumbnails = ({
    imageGallery,
    setSelectedImage,
}: ProductThumbnailsProps) => {
    return (
        <div className="column is-4-desktop is-3-touch">
            <div className="thumbnails is-flex is-flex-direction-column">
                {imageGallery.map((image, index) => (
                    <div
                        key={index}
                        className="thumbnail"
                        onClick={() => setSelectedImage(image)}
                    >
                        <Image
                            src={image.url}
                            alt={`thumbnail ${index}`}
                            width={image.width}
                            height={image.height}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductThumbnails;
