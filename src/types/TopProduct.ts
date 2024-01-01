export type TopProductFromQuery = {
    data: {
        productCollection: {
            items: {
                title: string;
                image: {
                    url: string;
                    description: string;
                    width: number;
                    height: number;
                }
            }[];
        }
    }
}

export type TopProduct = {
    title: string;
    image: {
        url: string;
        description: string;
        width: number;
        height: number;
    }
}