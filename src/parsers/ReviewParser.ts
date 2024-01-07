import {Review, ReviewFromQuery} from "@/src/types/Review";

export const ReviewParser = (data: ReviewFromQuery): Review[] | null => {
    if (data.data.reviewCollection.items.length < 3) {
        return null;
    }

    return data.data.reviewCollection.items;
}