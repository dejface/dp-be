import { Document } from "@contentful/rich-text-types";
export type ArticleBySlugFromQuery = {
    items: ArticleContent[];
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
        hyperlink: LinkAssetHyperlink[];
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

export type LinkAssetHyperlink = LinkEntry & {
    url: string;
};

export type ArticlePreviewFromQuery = {
    total: number;
    items: ArticlePreviewItem[];
};

export type ArticleProperties = {
    title: string;
    perex: string;
    slug: string;
    previewImage: {
        url: string;
        width: number;
        height: number;
    };
};

type ArticleBlogPage = ArticleProperties & {
    published: string;
    readTime: number;
};

export type ArticlePreviewItem = ArticleProperties &
    ArticleBlogPage & {
        sys: {
            id: string;
        };
    };

export type ArticlePreview = ArticleProperties &
    ArticleBlogPage & {
        id: string;
    };
