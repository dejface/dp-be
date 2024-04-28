import { PRODUCTS_PATH } from "@/src/utils/constants";
import { getPathByCategoryId } from "@/src/utils/getPathByCategoryId";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductImage } from "@/src/types/Image";

interface ProductLinkWithImageProps {
    categoryId: string;
    slug: string;
    image: ProductImage;
    locale: string;
    className?: string;
}

const ProductLinkWithImage = ({ ...props }: ProductLinkWithImageProps) => {
    return (
        <Link
            href={`/${PRODUCTS_PATH}/${getPathByCategoryId(props.categoryId)}/${
                props.slug
            }`}
            locale={props.locale}
        >
            <div className={props.className}>
                <Image
                    src={props.image.url}
                    alt={props.image.description}
                    width={props.image.width}
                    height={props.image.height}
                />
            </div>
        </Link>
    );
};

export default ProductLinkWithImage;
