import { ProductImage } from "@/src/types/Image";
import { Dispatch, SetStateAction } from "react";

export type CartItem = {
    id: string;
    image: ProductImage;
    quantity: number;
    title: string;
    price: number;
    slug: string;
    categoryId: string;
};

export type SetCartItems = Dispatch<SetStateAction<CartItem[]>>;
