import React from "react";
import Image from "next/image";
import { HpTopImage } from "@/src/types/Image";

interface ImageProps {
    leftImage: HpTopImage;
    rightImage: HpTopImage;
}

const renderImage = (image: HpTopImage): React.ReactNode => {
    return (
        <div className={`column is-6 pt-0`}>
            {image && (
                <figure className="image is-4by3">
                    <Image
                        src={image.url}
                        alt={image.title}
                        width={image.width}
                        height={image.height}
                    />
                </figure>
            )}
        </div>
    );
};

const HpTopImages = ({ leftImage, rightImage }: ImageProps) => (
    <div className="columns is-variable is-1 is-mobile mt-4">
        {renderImage(leftImage)}
        {renderImage(rightImage)}
    </div>
);

export default HpTopImages;
