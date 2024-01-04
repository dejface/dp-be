export type InstaPostFromQuery = {
    data: {
        instaPostCollection: {
            items: {
                author: string;
                url: string;
                caption: string;
                image: {
                    url: string;
                    width: number;
                    height: number;
                }
            }[];
        }
    }
}

export type InstaPost = {
    author: string;
    url: string;
    caption: string;
    image: {
        url: string;
        width: number;
        height: number;
    }
}