import {
    fetchArticleBySlug,
    fetchArticlePreviews,
    fetchHpTopImages,
    fetchInstaPosts,
    fetchProductBySlug,
    fetchProductPreviews,
    fetchReviews,
    fetchSlugs,
    fetchTopProducts,
    fetchTotalArticleCount,
    fetchTotalProductCount,
} from "@/src/api/fetch";
import fetchMock from "jest-fetch-mock";
import {
    getMockArticlePreviews,
    getMockInstaPosts,
    getMockReviews,
    testFetchFunction,
    transformArticleItem,
} from "@/src/api/testHelper";
import { LOCALE_CS } from "@/src/utils/constants";

require("jest-fetch-mock").enableMocks();

describe("fetch", () => {
    beforeEach(() => {
        fetchMock.doMock();
    });

    afterEach(() => {
        fetchMock.resetMocks();
    });

    describe("fetchTopProducts tests", () => {
        it("fetches top products successfully when there are 3 or more products", async () => {
            const mockProducts = [
                { id: "1", name: "Product 1" },
                { id: "2", name: "Product 2" },
                { id: "3", name: "Product 3" },
            ];
            await testFetchFunction(
                fetchTopProducts,
                { data: { productCollection: { items: mockProducts } } },
                mockProducts,
            );
        });

        it("returns null when there are less than 3 products", async () => {
            const mockProducts = [
                { id: "1", name: "Product 1" },
                { id: "2", name: "Product 2" },
            ];
            await testFetchFunction(
                fetchTopProducts,
                { data: { productCollection: { items: mockProducts } } },
                null,
            );
        });

        it("returns null when the response is null", async () => {
            fetchMock.mockRejectOnce(new Error("API error"));
            await testFetchFunction(fetchTopProducts, null, null);
        });
    });

    describe("fetchHpTopImages tests", () => {
        it.each([
            ["title1", "title2", null],
            ["title1", "hp-top-right", null],
            ["hp-top-left", "title2", null],
            [
                "hp-top-left",
                "hp-top-right",
                [
                    { id: "img1", title: "hp-top-left" },
                    { id: "img2", title: "hp-top-right" },
                ],
            ],
        ])(
            "fetches images successfully when hp-top-left and hp-top-right are presented, otherwise returns null",
            async (titleLeft: string, titleRight: string, expectedOutput) => {
                const mockImages = [
                    { id: "img1", title: titleLeft },
                    { id: "img2", title: titleRight },
                ];
                await testFetchFunction(
                    fetchHpTopImages,
                    { data: { assetCollection: { items: mockImages } } },
                    expectedOutput,
                );
            },
        );

        it("returns null when the response is null", async () => {
            fetchMock.mockRejectOnce(new Error("API error"));
            await testFetchFunction(fetchHpTopImages, null, null);
        });

        it("returns null when the response is not an array of length 2", async () => {
            const mockImages = [{ id: "img1", title: "hp-top-left" }];
            await testFetchFunction(
                fetchHpTopImages,
                { data: { assetCollection: { items: mockImages } } },
                null,
            );
        });
    });

    describe("fetchInstaPosts tests", () => {
        it.each([
            [3, null],
            [4, getMockInstaPosts(4)],
            [5, getMockInstaPosts(5)],
            [6, getMockInstaPosts(6)],
            [7, null],
        ])(
            "fetches Instagram posts successfully if there is 4 to 6 posts otherwise null",
            async (count: number, expectedOutput) => {
                const mockPosts = getMockInstaPosts(count);
                await testFetchFunction(
                    fetchInstaPosts,
                    { data: { instaPostCollection: { items: mockPosts } } },
                    expectedOutput,
                );
            },
        );
    });

    describe("fetchReviews tests", () => {
        it.each([
            [2, null],
            [3, getMockReviews(3)],
            [4, getMockReviews(4)],
        ])(
            "fetches reviews successfully when there are 3 or more reviews otherwise null",
            async (count: number, expectedOutput) => {
                const mockReviews = getMockReviews(count);
                await testFetchFunction(
                    fetchReviews,
                    { data: { reviewCollection: { items: mockReviews } } },
                    expectedOutput,
                );
            },
        );

        it("returns null when the response is null", async () => {
            fetchMock.mockRejectOnce(new Error("API error"));
            await testFetchFunction(fetchReviews, null, null);
        });
    });

    describe("fetchArticlePreviews tests", () => {
        it("returns null when the response is null", async () => {
            fetchMock.mockRejectOnce(new Error("API error"));
            await testFetchFunction(fetchArticlePreviews, null, null);
        });

        it.each([
            [true, 2, null],
            [
                true,
                3,
                { data: transformArticleItem(getMockArticlePreviews(3)) },
            ],
            [true, 4, null],
            [false, 0, null],
            [
                false,
                4,
                { data: transformArticleItem(getMockArticlePreviews(4)) },
            ],
        ])(
            "fetches article previews and return data when conditions met",
            async (isHomepage: boolean, count: number, expectedOutput) => {
                const mockPreviews = getMockArticlePreviews(count);

                fetchMock.mockResponseOnce(
                    JSON.stringify({
                        data: { articleCollection: { items: mockPreviews } },
                    }),
                );
                const result = await fetchArticlePreviews(
                    1,
                    LOCALE_CS,
                    1,
                    isHomepage,
                );
                expect(result).toEqual(expectedOutput);
                expect(fetch).toHaveBeenCalledTimes(1);
            },
        );
    });

    describe("fetchTotalArticleCount tests", () => {
        it("returns 0 when the response is null", async () => {
            fetchMock.mockRejectOnce(new Error("API error"));
            await testFetchFunction(fetchTotalArticleCount, null, 0);
        });

        it("returns total article count when response is not null", async () => {
            const total = 10;
            await testFetchFunction(
                fetchTotalArticleCount,
                { data: { articleCollection: { total } } },
                total,
            );
        });
    });

    describe("fetchSlugs tests", () => {
        it("returns slugs when response is not null", async () => {
            const slugsCz = [{ slug: "slug1" }, { slug: "slug2" }];
            const slugsSk = [{ slug: "slug3" }, { slug: "slug4" }];
            const expectedOutput = {
                slugsCZ: ["slug1", "slug2"],
                slugsSK: ["slug3", "slug4"],
            };
            await testFetchFunction(
                fetchSlugs,
                {
                    data: {
                        slugsCZ: { items: slugsCz },
                        slugsSK: { items: slugsSk },
                    },
                },
                expectedOutput,
            );
        });

        it("returns empty arrays when response is null", async () => {
            fetchMock.mockRejectOnce(new Error("API error"));
            await testFetchFunction(fetchSlugs, null, {
                slugsCZ: [],
                slugsSK: [],
            });
        });
    });

    describe("fetchArticleBySlug tests", () => {
        it("returns null when the response is null", async () => {
            fetchMock.mockRejectOnce(new Error("API error"));
            await testFetchFunction(fetchArticleBySlug, null, null);
        });

        it("returns null when the response is an empty array", async () => {
            await testFetchFunction(
                fetchArticleBySlug,
                { data: { articleCollection: { items: [] } } },
                null,
            );
        });

        it("returns data when response is not null", async () => {
            const article = {
                title: "Title",
                content: "Content",
                slug: "slug",
                published: "published",
                readTime: "readTime",
                previewImage: "previewImage",
            };
            await testFetchFunction(
                fetchArticleBySlug,
                { data: { articleCollection: { items: [article] } } },
                { data: article },
            );
        });
    });

    describe("fetchTotalProductCount tests", () => {
        it("returns 0 when the response is null", async () => {
            fetchMock.mockRejectOnce(new Error("API error"));
            await testFetchFunction(fetchTotalProductCount, null, 0);
        });

        it("returns total product count when response is not null", async () => {
            const total = 10;
            await testFetchFunction(
                fetchTotalProductCount,
                { data: { productCollection: { total } } },
                total,
            );
        });
    });

    describe("fetchProductPreviews tests", () => {
        it("returns null when the response is null", async () => {
            fetchMock.mockRejectOnce(new Error("API error"));
            await testFetchFunction(fetchProductPreviews, null, null);
        });

        it.each([
            [
                [{ id: "1", name: "Product 1" }],
                { data: [{ id: "1", name: "Product 1" }] },
            ],
            [[], null],
        ])(
            "returns data when response is not null",
            async (products, expectedOutput) => {
                await testFetchFunction(
                    fetchProductPreviews,
                    { data: { productCollection: { items: products } } },
                    expectedOutput,
                );
            },
        );
    });

    describe("fetchProductBySlug tests", () => {
        it("returns null when the response is null", async () => {
            fetchMock.mockRejectOnce(new Error("API error"));
            await testFetchFunction(fetchProductBySlug, null, null);
        });

        it("returns null when the response is an empty array", async () => {
            await testFetchFunction(
                fetchProductBySlug,
                { data: { productCollection: { items: [] } } },
                null,
            );
        });

        it("returns data when response is not null", async () => {
            const product = {
                name: "Product",
                content: "Content",
                slug: "slug",
                published: "published",
                readTime: "readTime",
                previewImage: "previewImage",
            };
            await testFetchFunction(
                fetchProductBySlug,
                { data: { productCollection: { items: [product] } } },
                { data: product },
            );
        });
    });
});
