export type TopProductFromQuery = {
    data: {
        productCollection: {
            items: {
                title: string;
                slug: string;
                image: {
                    url: string;
                    description: string;
                    width: number;
                    height: number;
                };
            }[];
        };
    };
};

export type TopProduct = {
    title: string;
    slug: string;
    image: {
        url: string;
        description: string;
        width: number;
        height: number;
    };
};
