import {
    BRACELETS_ID,
    EARRINGS_ID,
    NECKLACES_ID,
    RINGS_ID,
} from "@/src/utils/constants";

export const getTransKeyByCategoryId = (categoryId: string) => {
    switch (categoryId) {
        case EARRINGS_ID:
            return "app.earrings";
        case NECKLACES_ID:
            return "app.necklaces";
        case RINGS_ID:
            return "app.rings";
        case BRACELETS_ID:
            return "app.bracelets";
        default:
            return null;
    }
};
