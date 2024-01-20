import { InstaPost, InstaPostFromQuery } from "@/src/types/InstaPost";

export const InstaPostsParser = (
    data: InstaPostFromQuery,
): InstaPost[] | null => {
    if (
        data.data.instaPostCollection.items.length < 4 &&
        data.data.instaPostCollection.items.length > 6
    ) {
        return null;
    }

    return data.data.instaPostCollection.items;
};
