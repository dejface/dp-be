import { Data } from "@/src/types/Types";
import { ProductFromQuery } from "@/src/types/Product";
import { ArticleBySlugFromQuery } from "@/src/types/Article";

export const ItemDetailParser = (
    data: ProductFromQuery | ArticleBySlugFromQuery,
): Data | null => {
    if (data.items.length !== 1) {
        return null;
    }

    return {
        data: data.items[0],
    };
};
