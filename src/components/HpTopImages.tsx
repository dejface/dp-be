import React from "react";
import Image from "next/image";
import {AssetFile} from "contentful";

interface ImageProps {
    leftImage: AssetFile;
    rightImage: AssetFile;
}

const renderImage = (image: AssetFile, altText: string): React.ReactNode => {
    return <div className="column is-6">
        {image && (
            <figure className="image is-4by3">
                <Image
                    src={`https:${image.url}`}
                    alt={altText}
                    width={image.details.image?.width}
                    height={image.details.image?.height}
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