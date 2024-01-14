export type ArticlePreviewFromQuery = {
    data: {
        articleCollection: {
            items: {
                title: string;
                perex: string;
                previewImage: {
                    url: string;
                    width: number;
                    height: number;
                }
            }[];
        }
    }
}

export type ArticlePreview = {
    title: string;
    perex: string;
    previewImage: {
        url: string;
        width: number;
        height: number;
    }
}