import {
    BESTSELLER,
    CATEGORY,
    EARRINGS_ID,
    NECKLACES_ID,
    NEW_ARRIVAL,
    RINGS_ID,
} from "@/src/utils/constants";
import { FilterOptions } from "@/src/types/Filter";
import { useTranslation } from "@/src/contexts/TransContext";

const useGenerateProductFilterOptions = (): FilterOptions => {
    const trans = useTranslation();
    return {
        [trans("app.earrings")]: {
            type: CATEGORY,
            id: EARRINGS_ID,
            name: trans("app.earrings"),
        },
        [trans("app.rings")]: {
            type: CATEGORY,
            id: RINGS_ID,
            name: trans("app.rings"),
        },
        [trans("app.necklaces")]: {
            type: CATEGORY,
            id: NECKLACES_ID,
            name: trans("app.necklaces"),
        },
        [trans("app.best_seller")]: {
            type: BESTSELLER,
            id: "bestSeller",
            name: trans("app.best_seller"),
        },
        [trans("app.new_arrivals")]: {
            type: NEW_ARRIVAL,
            id: "newArrival",
            name: trans("app.new_arrivals"),
        },
    };
};

export default useGenerateProductFilterOptions;
