import { Product } from "@/src/types/Product";
import Image from "next/image";
import React from "react";
import { getFormattedPrice } from "@/src/utils/getFormattedPrice";
import { useLanguage } from "@/src/hooks/useTranslation";
import Link from "next/link";
import { PRODUCT_PATH, PRODUCTS_PATH } from "@/src/utils/constants";

interface ProductPreviewProps {
    products: Product[];
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
                                <Link
                                    href={`/${PRODUCTS_PATH}/${PRODUCT_PATH}/${product.slug}`}
                                    locale={locale}
                                >
                                    <Image
                                        src={product.image.url}
                                        alt={product.image.description}
                                        width={product.image.width}
                                        height={product.image.height}
                                    />
                                    {product.lastPiecesText && (
                                        <div className="product__lastPiecesText is-italic is-size-6 has-text-centered has-background-white has-text-black">
                                            <span className="m-2 is-size-7">
                                                {product.lastPiecesText.toLowerCase()}
                                            </span>
                                        </div>
                                    )}
                                </Link>
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
