import { ProductPreviewFromQuery, ProductPreview } from "@/src/types/Product";
import { TransformedData } from "@/src/types/Types";

export const ProductPreviewParser = (
    data: ProductPreviewFromQuery,
): TransformedData | null => {
    const items = data.items;

    if (items.length >= 1) {
        const transformedItems: ProductPreview[] = items.map(
            ({ imageGalleryCollection, ...item }) => ({
                ...item,
                imageGallery: imageGalleryCollection.items.map((image) => ({
                    description: image.description,
                    url: image.url,
                    width: image.width,
                    height: image.height,
                })),
            }),
        );

        return {
            data: transformedItems,
            total: data.total,
        };
    } else {
        return null;
    }
};
