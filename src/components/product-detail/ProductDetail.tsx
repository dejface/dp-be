import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import { Product } from "@/src/types/Product";
import Image from "next/image";
import { useLanguage, useTranslation } from "@/src/hooks/useTranslation";
import ProductThumbnails from "@/src/components/product-detail/ProductThumbnails";
import QuantityChanger from "@/src/components/QuantityChanger";
import CartAddModal from "@/src/components/product-detail/CartAddModal";
import PriceFormatter from "@/src/components/PriceFormatter";
import { useShoppingCart } from "@/src/contexts/ShoppingCartContext";

interface ProductProps {
    product: Product;
}

const ProductDetail = ({ product }: ProductProps) => {
    const trans = useTranslation();
    const [locale] = useLanguage();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.imageGallery[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useShoppingCart();

    const handleAddToCartClick = () => {
        const newCartItem = { id: product.sys.id, quantity };
        const existingItemIndex = items.findIndex(
            (item) => item.id === product.sys.id,
        );
        let updatedCartItems = [];
        if (existingItemIndex >= 0) {
            updatedCartItems = items.map((item) =>
                item.id === product.sys.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item,
            );
        } else {
            updatedCartItems = [...items, newCartItem];
        }
        setItems(updatedCartItems);
        setIsModalOpen(true);
    };

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
                        className="product__add-to-cart is-radiusless has-text-weight-bold is-size-7"
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
