import { InstaPost } from "@/src/types/InstaPost";
import { Review } from "@/src/types/Review";
import { HpTopImage } from "@/src/types/Image";

interface Collection<T> {
    total: number;
    items: T;
}

export type FetchResponse<T> = T;

export type ProductFetchResponse<T> = FetchResponse<{
    data: { productCollection: Collection<T> };
}>;

export type ArticleFetchResponse<T> = FetchResponse<{
    data: { articleCollection: Collection<T> };
}>;

export type AssetFetchResponse = FetchResponse<{
    data: { assetCollection: Collection<HpTopImage[]> };
}>;

export type InstaPostFetchResponse = FetchResponse<{
    data: { instaPostCollection: Collection<InstaPost[]> };
}>;

export type ReviewFetchResponse = FetchResponse<{
    data: { reviewCollection: Collection<Review[]> };
}>;

export type SlugsFetchResponse = FetchResponse<{
    data: {
        slugsCZ: Collection<{ slug: string }[]>;
        slugsSK: Collection<{ slug: string }[]>;
    };
}>;
