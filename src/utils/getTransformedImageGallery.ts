import { WithImageGalleryCollection } from "@/src/types/Product";

export const getTransformedImageGallery = <
    T extends WithImageGalleryCollection,
>(
    responseData: T[],
) => {
    return responseData.map(({ imageGalleryCollection, ...item }) => ({
        ...item,
        imageGallery: imageGalleryCollection.items,
    }));
};
