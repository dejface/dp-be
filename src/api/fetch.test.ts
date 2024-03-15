import {
    fetchArticleBySlug,
    fetchArticlePreviews,
    fetchHpTopImages,
    fetchInstaPosts,
    fetchProductBySlug,
    fetchProductInCartLocalizedInfo,
    fetchProductPreviews,
    fetchReviews,
    fetchSlugs,
    fetchTopProducts,
    fetchTotalArticleCount,
    fetchTotalProductCount,
    fetchTotalProductCountByCategory,
    fetchVoucherCollection,
} from "@/src/api/fetch";
import fetchMock from "jest-fetch-mock";
import { LOCALE_CS } from "@/src/utils/constants";
import {
    getMockArticlePreviews,
    getMockInstaPosts,
    getMockReviews,
    testFetchFunction,
    transformArticleItem,
} from "../../test/helpers/fetchTestHelper";

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
                {
                    id: "1",
                    name: "Product 1",
                    imageGalleryCollection: {
                        items: [
                            {
                                description: "desc1",
                                url: "url1",
                                width: 100,
                                height: 100,
                            },
                        ],
                    },
                },
                {
                    id: "2",
                    name: "Product 2",
                    imageGalleryCollection: {
                        items: [
                            {
                                description: "desc2",
                                url: "url2",
                                width: 200,
                                height: 200,
                            },
                        ],
                    },
                },
                {
                    id: "3",
                    name: "Product 3",
                    imageGalleryCollection: {
                        items: [
                            {
                                description: "desc3",
                                url: "url3",
                                width: 300,
                                height: 300,
                            },
                        ],
                    },
                },
            ];

            const expectedProducts = mockProducts.map(
                ({ imageGalleryCollection, ...item }) => ({
                    ...item,
                    imageGallery: imageGalleryCollection.items.map((image) => ({
                        description: image.description,
                        url: image.url,
                        width: image.width,
                        height: image.height,
                    })),
                }),
            );

            await testFetchFunction(
                fetchTopProducts,
                { data: { productCollection: { items: mockProducts } } },
                expectedProducts,
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
            await testFetchFunction(fetchReviews, null, null);
        });
    });

    describe("fetchArticlePreviews tests", () => {
        it("returns null when the response is null", async () => {
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
            await testFetchFunction(fetchSlugs, null, {
                slugsCZ: [],
                slugsSK: [],
            });
        });
    });

    describe("fetchArticleBySlug tests", () => {
        it("returns null when the response is null", async () => {
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
            await testFetchFunction(fetchProductPreviews, null, null);
        });

        it.each([
            [
                [
                    {
                        id: "1",
                        name: "Product 1",
                        imageGalleryCollection: {
                            items: [
                                {
                                    description: "desc1",
                                    url: "url1",
                                    width: 100,
                                    height: 100,
                                },
                            ],
                        },
                    },
                ],
                {
                    data: [
                        {
                            id: "1",
                            name: "Product 1",
                            imageGallery: [
                                {
                                    description: "desc1",
                                    url: "url1",
                                    width: 100,
                                    height: 100,
                                },
                            ],
                        },
                    ],
                },
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

    describe("fetchTotalProductCountByCategory tests", () => {
        it("returns 0 when the response is null", async () => {
            await testFetchFunction(fetchTotalProductCountByCategory, null, 0);
        });

        it("returns total product count when response is not null", async () => {
            const total = 10;
            await testFetchFunction(
                fetchTotalProductCountByCategory,
                {
                    data: {
                        categoryCollection: {
                            items: [
                                {
                                    linkedFrom: { entryCollection: { total } },
                                },
                            ],
                        },
                    },
                },
                total,
            );
        });
    });

    describe("fetchProductInCartLocalizedInfo tests", () => {
        it("returns null when the response is null", async () => {
            await testFetchFunction(
                () => fetchProductInCartLocalizedInfo(["1", "2"], "cs"),
                null,
                null,
            );
        });

        it("returns data when response is not null", async () => {
            const products = [
                {
                    sys: { id: "1" },
                    title: "Product 1",
                    price: 100,
                    slug: "slug1",
                },
                {
                    sys: { id: "2" },
                    title: "Product 2",
                    price: 200,
                    slug: "slug2",
                },
            ];

            const mockResponse = {
                data: {
                    productCollection: {
                        items: products,
                    },
                },
            };
            await testFetchFunction(
                () => fetchProductInCartLocalizedInfo(["1", "2"], "cs"),
                mockResponse,
                products,
            );
        });
    });

    describe("fetchVoucherCollection tests", () => {
        it("returns null when the response is null", async () => {
            await testFetchFunction(fetchVoucherCollection, null, null);
        });

        it("returns data when response is not null", async () => {
            const vouchers = [
                { id: "1", code: "CODE1", discount: 10 },
                { id: "2", code: "CODE2", discount: 20 },
            ];
            await testFetchFunction(
                fetchVoucherCollection,
                { data: { voucherCollection: { items: vouchers } } },
                vouchers,
            );
        });
    });
});
