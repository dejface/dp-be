import { Product } from "@/src/types/Product";

export const generateMockProduct = (
    productId: string,
    categoryId?: string,
    lastPiecesText?: string | undefined,
    bestSeller?: boolean,
    newArrival?: boolean,
): Product => {
    return {
        sys: {
            id: productId,
        },
        title: `Test Product ${productId}`,
        imageGallery: [
            {
                url: "/test-image.jpg",
                description: "Test Image",
                width: 500,
                height: 500,
            },
        ],
        slug: `test-product-${productId}`,
        shortDescription: "This is a test product",
        price: 100,
        lastPiecesText,
        topProduct: false,
        category: {
            sys: {
                id: categoryId || "test-category",
            },
            title: "Test Category",
        },
        description: "This is a test product",
        bestSeller: bestSeller,
        newArrival: newArrival,
    };
};
