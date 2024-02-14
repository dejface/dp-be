import { HpTopImage } from "@/src/types/Image";

export const HpTopImageParser = (data: {
    items: HpTopImage[];
}): [HpTopImage, HpTopImage] | null => {
    if (data.items.length !== 2) {
        return null;
    }

    const rightImage = data.items.find((item) => item.title === "hp-top-right");
    const leftImage = data.items.find((item) => item.title === "hp-top-left");

    if (!rightImage || !leftImage) {
        return null;
    }

    return [leftImage, rightImage];
};
