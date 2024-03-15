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
import { MAXIMUM_PRODUCT_QUANTITY } from "@/src/utils/constants";

interface ProductProps {
    product: Product;
}

const ProductDetail = ({ product }: ProductProps) => {
    const trans = useTranslation();
    const [locale] = useLanguage();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.imageGallery[0]);
    const { items, setItems } = useShoppingCart();
    const {
        handleAddToCartClick,
        isModalOpen,
        setIsModalOpen,
        wasMaximumQuantityExceeded,
    } = useAddToCart(product, items, setItems, quantity);
    return (
        <div className="columns product-detail__container is-flex px-3">
            <div className="columns is-mobile product-detail__images px-1-mobile">
                <ProductThumbnails
                    imageGallery={product.imageGallery}
                    setSelectedImage={setSelectedImage}
                />
                <div className="column is-8-desktop is-9-mobile selected-image">
                    <Image
                        src={selectedImage.url}
                        height={selectedImage.height}
                        width={selectedImage.width}
                        alt={"alt"}
                    />
                </div>
            </div>
            <div className="column is-5 is-offset-1-desktop text__column">
                <p className="product-detail__title mb-3">{product.title}</p>
                <p className="product-detail__price mb-3">
                    <PriceFormatter price={product.price} locale={locale} />
                </p>
                <div className="content product-detail__description">
                    {product.description}
                </div>
                <div className="product-detail__actions">
                    <div className="quantity-changer__product">
                        <QuantityChanger
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />
                    </div>
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
                        wasMaximumQuantityExceeded={wasMaximumQuantityExceeded}
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
