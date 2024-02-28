import fetchMock from "jest-fetch-mock";
import { LOCALE_CS } from "@/src/utils/constants";

export const getMockInstaPosts = (count: number) => {
    const mockedPosts = [];
    for (let i = 0; i < count; i++) {
        mockedPosts.push({ id: `post${i}`, content: `Content ${i}` });
    }
    return mockedPosts;
};

export const getMockReviews = (count: number) => {
    const mockedReviews = [];
    for (let i = 0; i < count; i++) {
        mockedReviews.push({ id: `${i}`, name: `Review ${i}` });
    }
    return mockedReviews;
};

export const getMockArticlePreviews = (count: number) => {
    const mockedPreviews = [];
    for (let i = 0; i < count; i++) {
        mockedPreviews.push({
            sys: { id: `article${i}` },
            title: `Article ${i}`,
            perex: `Perex ${i}`,
            slug: `slug-${i}`,
            previewImage: `previewImage-${i}`,
            published: `published-${i}`,
            readTime: `readTime-${i}`,
        });
    }
    return mockedPreviews;
};

export const transformArticleItem = (items: any[]) => {
    return items.map((item) => ({
        id: item.sys.id,
        title: item.title,
        perex: item.perex,
        slug: item.slug,
        previewImage: item.previewImage,
        published: item.published,
        readTime: item.readTime,
    }));
};

export const testFetchFunction = async (
    fetchFunction: Function,
    mockResponse: any,
    expectedResult: any,
) => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const result = await fetchFunction(LOCALE_CS);
    expect(result).toEqual(expectedResult);
    expect(fetch).toHaveBeenCalledTimes(1);
};
