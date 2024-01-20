import { TopProduct, TopProductFromQuery } from "@/src/types/TopProduct";

export const TopProductsParser = (
    data: TopProductFromQuery,
): TopProduct[] | null => {
    if (data.data.productCollection.items.length < 3) {
        return null;
    }

    return data.data.productCollection.items;
};
