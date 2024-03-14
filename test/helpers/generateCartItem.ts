import { CartItem } from "@/src/types/Cart";

export const generateCartItem = (
    id: string,
    price: number,
    quantity: number,
): CartItem => {
    return {
        id: id,
        price: price,
        quantity: quantity,
        title: "title",
        image: {
            url: "url",
            description: "desc",
            width: 100,
            height: 100,
        },
        categoryId: "categoryId",
        slug: "slug",
    };
};
