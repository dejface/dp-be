type Image = {
    url: string;
    width: number;
    height: number;
};

export type ProductImage = Image & {
    description: string;
};

export type HpTopImage = Image & {
    title: string;
};
