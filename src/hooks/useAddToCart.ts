import React, { useState } from "react";
import { Product } from "@/src/types/Product";
import { CartItem, SetCartItems } from "@/src/types/Cart";
import { MAXIMUM_PRODUCT_QUANTITY } from "@/src/utils/constants";

interface UseAddToCartReturn {
    handleAddToCartClick: () => void;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    wasMaximumQuantityExceeded: boolean;
}

const useAddToCart = (
    product: Product,
    items: CartItem[],
    setItems: SetCartItems,
    quantity: number,
): UseAddToCartReturn => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wasMaximumQuantityExceeded, setWasMaximumQuantityExceeded] =
        useState(false);

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
            updatedCartItems = items.map((item) => {
                if (item.id === product.sys.id) {
                    const updatedQuantity = item.quantity + quantity;
                    if (updatedQuantity > MAXIMUM_PRODUCT_QUANTITY) {
                        setWasMaximumQuantityExceeded(true);
                        return {
                            ...item,
                            quantity: MAXIMUM_PRODUCT_QUANTITY,
                        };
                    } else {
                        return {
                            ...item,
                            quantity: updatedQuantity,
                        };
                    }
                } else {
                    return item;
                }
            });
        } else {
            updatedCartItems = [...items, newCartItem];
        }
        setItems(updatedCartItems);
        setIsModalOpen(true);
    };

    return {
        handleAddToCartClick,
        isModalOpen,
        setIsModalOpen,
        wasMaximumQuantityExceeded,
    };
};

export default useAddToCart;
