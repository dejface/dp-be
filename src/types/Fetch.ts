import { InstaPost } from "@/src/types/InstaPost";
import { Review } from "@/src/types/Review";
import { HpTopImage } from "@/src/types/Image";
import { LegalDocument, ShippingOption, Voucher } from "@/src/types/Types";

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

export type CategoryFetchResponse = FetchResponse<{
    data: {
        categoryCollection: {
            items: [{ linkedFrom: { entryCollection: { total: number } } }];
        };
    };
}>;

export type SlugsFetchResponse = FetchResponse<{
    data: {
        slugsCZ: Collection<{ slug: string }[]>;
        slugsSK: Collection<{ slug: string }[]>;
    };
}>;

export type VoucherFetchResponse = FetchResponse<{
    data: { voucherCollection: Collection<Voucher[]> };
}>;

export type ShippingOptionsFetchResponse = FetchResponse<{
    data: { shippingCollection: Collection<ShippingOption[]> };
}>;

export type LegalDocumentsFetchResponse = FetchResponse<{
    data: {
        legalDocumentsCollection: Collection<LegalDocument[]>;
    };
}>;
