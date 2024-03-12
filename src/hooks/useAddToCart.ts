import React, { useState } from "react";
import { Product } from "@/src/types/Product";
import { CartItem, SetCartItems } from "@/src/types/Cart";

const useAddToCart = (
    product: Product,
    items: CartItem[],
    setItems: SetCartItems,
    quantity: number,
): [() => void, boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCartClick = () => {
        const newCartItem = {
            id: product.sys.id,
            image: product.imageGallery[0],
            categoryId: product.category.sys.id,
            quantity,
            title: "",
            price: 0,
            slug: "",
        };
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

    return [handleAddToCartClick, isModalOpen, setIsModalOpen];
};

export default useAddToCart;
