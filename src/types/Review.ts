export type ReviewFromQuery = {
    data: {
        reviewCollection: {
            items: {
                reviewer: string;
                description: string;
                image: {
                    url: string;
                    width: number;
                    height: number;
                };
            }[];
        };
    };
};

export type Review = {
    reviewer: string;
    description: string;
    image: {
        url: string;
        width: number;
        height: number;
    };
};
