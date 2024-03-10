import { ProductPreviewWithImageGallery } from "@/src/types/Product";
import { getTransformedImageGallery } from "@/src/utils/getTransformedImageGallery";
import { ProductImage } from "@/src/types/Image";

const generateMockData = (items: ProductImage[]) => [
    {
        title: "Test Product",
        imageGalleryCollection: {
            items,
        },
    },
];

const generateExpectedOutput = (items: ProductImage[]) => [
    {
        title: "Test Product",
        imageGallery: items,
    },
];

describe("getTransformedImageGallery", () => {
    it("should transform image gallery collection correctly", () => {
        const items: ProductImage[] = [
            {
                description: "Test Image",
                url: "http://test.com",
                width: 100,
                height: 100,
            },
        ];
        const mockData = generateMockData(items);
        const expectedOutput = generateExpectedOutput(items);
        expect(getTransformedImageGallery(mockData)).toEqual(expectedOutput);
    });

    it("should return an empty array when responseData is empty", () => {
        const mockData: ProductPreviewWithImageGallery[] = [];
        const expectedOutput: ProductPreviewWithImageGallery[] = [];
        expect(getTransformedImageGallery(mockData)).toEqual(expectedOutput);
    });

    it("should return an empty imageGallery when imageGalleryCollection.items is empty", () => {
        const mockData = generateMockData([]);
        const expectedOutput = generateExpectedOutput([]);
        expect(getTransformedImageGallery(mockData)).toEqual(expectedOutput);
    });

    it("should handle multiple images in imageGalleryCollection.items", () => {
        const items: ProductImage[] = [
            {
                description: "Test Image 1",
                url: "http://test1.com",
                width: 100,
                height: 100,
            },
            {
                description: "Test Image 2",
                url: "http://test2.com",
                width: 200,
                height: 200,
            },
        ];
        const mockData = generateMockData(items);
        const expectedOutput = generateExpectedOutput(items);
        expect(getTransformedImageGallery(mockData)).toEqual(expectedOutput);
    });
});
