import { Product } from "@/src/types/Product";
import { FilterProductsCriteria } from "@/src/types/Filter";
import { BESTSELLER, CATEGORY, NEW_ARRIVAL } from "@/src/utils/constants";

export const filterProducts = (
    products: Product[],
    filterCriteria: FilterProductsCriteria | null,
): Product[] => {
    return products.filter((product) => {
        if (!filterCriteria) return true;

        switch (filterCriteria.type) {
            case CATEGORY:
                return product.category.sys.id === filterCriteria.id;
            case BESTSELLER:
                return product.bestSeller === true;
            case NEW_ARRIVAL:
                return product.newArrival === true;
            default:
                return true;
        }
    });
};
