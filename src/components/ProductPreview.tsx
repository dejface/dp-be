import { ProductPreview } from "@/src/types/ProductPreview";
import Image from "next/image";
import React from "react";
import { getFormattedPrice } from "@/src/utils/getFormattedPrice";
import { useLanguage } from "@/src/hooks/useTranslation";

interface ProductPreviewProps {
    products: ProductPreview[];
    totalPages: string;
    currentPage: string;
}

const ProductPreview = ({ products }: ProductPreviewProps) => {
    const [locale] = useLanguage();
    return (
        <>
            {products.map((product) => (
                <div className="column is-one-quarter" key={product.title}>
                    <div className="card is-shadowless">
                        <div className="card-image">
                            <figure className="image is-3by4">
                                <Image
                                    src={product.image.url}
                                    alt={product.image.description}
                                    width={product.image.width}
                                    height={product.image.height}
                                />
                            </figure>
                        </div>
                        <div className="card-content is-paddingless has-text-left">
                            <p className="title is-size-6 is-size-7-mobile pt-3 is-marginless">
                                {product.title}
                            </p>
                            <p className="is-italic is-size-7 pt-1">
                                {product.shortDescription}
                            </p>
                            <p className="is-size-7 has-text-weight-medium">
                                {getFormattedPrice(product.price, locale)}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductPreview;
