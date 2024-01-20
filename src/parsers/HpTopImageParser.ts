import { HpTopImage, HpTopImageFromQuery } from "@/src/types/HpTopImage";

export const HpTopImageParser = (
    data: HpTopImageFromQuery,
): [HpTopImage, HpTopImage] | null => {
    if (data.data.assetCollection.items.length !== 2) {
        return null;
    }

    const rightImage = data.data.assetCollection.items.find(
        (item) => item.title === "hp-top-right",
    )!;
    const leftImage = data.data.assetCollection.items.find(
        (item) => item.title === "hp-top-left",
    )!;

    if (!rightImage || !leftImage) {
        return null;
    }

    return [leftImage, rightImage];
};
