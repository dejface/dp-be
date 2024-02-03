import { Document } from "@contentful/rich-text-types";
export type ArticleBySlugFromQuery = {
    data: {
        articleCollection: {
            items: {
                sys: {
                    id: string;
                };
                title: string;
                perex: string;
                published: string;
                readTime: number;
                previewImage: {
                    url: string;
                    width: number;
                    height: number;
                };
                content: RichTextContent;
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
    content: RichTextContent;
};

export type RichTextContent = {
    json: Document;
    links: AssetLinks & EntryLinks;
};

export type AssetLinks = {
    assets: {
        block: LinkAsset[];
    };
};

export type EntryLinks = {
    entries: {
        hyperlink: LinkEntry[];
    };
};

export type LinkAsset = {
    sys: {
        id: string;
    };
    url: string;
    title: string;
    width: number;
    height: number;
    description: string;
    contentType: string;
};

export type LinkEntry = {
    sys: {
        id: string;
    };
};
