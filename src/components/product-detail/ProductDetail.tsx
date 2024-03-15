import React, { useState } from "react";
import { Product } from "@/src/types/Product";
import Image from "next/image";
import ProductThumbnails from "@/src/components/product-detail/ProductThumbnails";
import QuantityChanger from "@/src/components/QuantityChanger";
import CartAddModal from "@/src/components/product-detail/CartAddModal";
import PriceFormatter from "@/src/components/PriceFormatter";
import { useShoppingCart } from "@/src/contexts/ShoppingCartContext";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";
import useAddToCart from "@/src/hooks/useAddToCart";

interface ProductProps {
    product: Product;
}

const ProductDetail = ({ product }: ProductProps) => {
    const trans = useTranslation();
    const [locale] = useLanguage();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.imageGallery[0]);
    const { items, setItems } = useShoppingCart();
    const { handleAddToCartClick, isModalOpen, setIsModalOpen } = useAddToCart(
        product,
        items,
        setItems,
        quantity,
    );

    return (
        <div className="columns">
            <ProductThumbnails
                imageGallery={product.imageGallery}
                setSelectedImage={setSelectedImage}
            />
            <div className="column is-6">
                <figure className="selected-image">
                    <Image
                        src={selectedImage.url}
                        height={selectedImage.height}
                        width={selectedImage.width}
                        alt={"alt"}
                    />
                </figure>
            </div>
            <div className="column is-4 is-flex-direction-column is-justify-content-flex-start">
                <p className="title product__title is-4 mb-5">
                    {product.title}
                </p>
                <p className="product__price is-6 mb-5 is-size-4">
                    <PriceFormatter price={product.price} locale={locale} />
                </p>
                <div className="content product__description">
                    {product.description}
                </div>
                <div className="field has-addons is-flex is-align-items-center mt-6">
                    <QuantityChanger
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                    <button
                        className="confirm-button"
                        onClick={handleAddToCartClick}
                    >
                        {trans("app.add_to_cart")}
                    </button>
                </div>
                {isModalOpen && (
                    <CartAddModal
                        title={product.title}
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
