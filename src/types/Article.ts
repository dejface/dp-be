export type ArticleBySlugFromQuery = {
    data: {
        articleCollection: {
            items: {
                title: string;
                perex: string;
                published: string;
                readTime: number;
                previewImage: {
                    url: string;
                    width: number;
                    height: number;
                };
                content: {
                    json: {
                        content: {
                            value: string;
                        }[];
                    };
                };
            }[];
        };
    };
};

export type ArticleContent = {
    title: string;
    perex: string;
    published: string;
    readTime: number;
    previewImage: {
        url: string;
        width: number;
        height: number;
    };
    content: {
        json: {
            content: {
                value: string;
            }[];
        };
    };
};
