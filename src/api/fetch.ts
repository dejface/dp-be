import {TopProductQuery} from "@/src/queries/TopProductQuery";
import {TopProductFromQuery} from "@/src/types/TopProduct";
import {FetchOptions, getFetchOptions} from "@/src/api/fetchOptions";
import {HpTopImagesQuery} from "@/src/queries/HpTopImagesQuery";
import {HpTopImageFromQuery} from "@/src/types/HpTopImage";

const ContentfulUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`;

const makeFetch = async (fetchOptions: FetchOptions) => {
    return await fetch(ContentfulUrl, fetchOptions)
        .then((response) => response.json());
}

export const fetchTopProducts = async (): Promise<TopProductFromQuery> => {
    const fetchOptions = getFetchOptions(TopProductQuery);

    return await makeFetch(fetchOptions);
}

export const fetchHpTopImages = async (): Promise<HpTopImageFromQuery> => {
    const fetchOptions = getFetchOptions(HpTopImagesQuery);
    return makeFetch(fetchOptions);
}