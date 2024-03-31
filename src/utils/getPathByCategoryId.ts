import {
    BRACELETS_ID,
    BRACELETS_PATH,
    EARRINGS_ID,
    EARRINGS_PATH,
    NECKLACES_ID,
    NECKLACES_PATH,
    RINGS_ID,
    RINGS_PATH,
} from "@/src/utils/constants";

export const getPathByCategoryId = (categoryId: string) => {
    switch (categoryId) {
        case EARRINGS_ID:
            return EARRINGS_PATH;
        case NECKLACES_ID:
            return NECKLACES_PATH;
        case RINGS_ID:
            return RINGS_PATH;
        case BRACELETS_ID:
            return BRACELETS_PATH;
        default:
            return "";
    }
};
