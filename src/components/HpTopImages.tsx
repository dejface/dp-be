import React from "react";
import Image from "next/image";
import {HpTopImage} from "@/src/types/HpTopImage";

interface ImageProps {
    leftImage: HpTopImage;
    rightImage: HpTopImage;
}

const renderImage = (image: HpTopImage, altText: string): React.ReactNode => {
    return <div className="column is-6">
        {image && (
            <figure className="image is-4by3">
                <Image
                    src={image.url}
                    alt={altText}
                    width={image.width}
                    height={image.height}
                />
            </figure>
        )}
    </div>;
}


const HpTopImages = ({leftImage, rightImage}: ImageProps) => (
    <div className="columns is-variable is-1 is-mobile mt-4">
        {renderImage(leftImage, "")}
        {renderImage(rightImage, "")}
    </div>
);

export default HpTopImages;