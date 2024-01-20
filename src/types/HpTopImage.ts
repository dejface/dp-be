export type HpTopImageFromQuery = {
    data: {
        assetCollection: {
            items: {
                title: string;
                url: string;
                width: number;
                height: number;
            }[];
        };
    };
};

export type HpTopImage = {
    title: string;
    url: string;
    width: number;
    height: number;
};
