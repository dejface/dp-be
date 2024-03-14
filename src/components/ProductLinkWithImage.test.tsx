import { render, screen } from "@testing-library/react";
import ProductLinkWithImage from "@/src/components/ProductLinkWithImage";

jest.mock("@/utils/getPathByCategoryId", () => ({
    getPathByCategoryId: jest.fn((categoryId: string) => {
        return `${categoryId}`;
    }),
}));

describe("ProductLinkWithImage", () => {
    beforeEach(() => {
        const props = {
            categoryId: "1",
            slug: "test-product",
            image: {
                url: "test.jpg",
                description: "Test Image",
                width: 100,
                height: 100,
            },
            locale: "cs",
            className: "test-class",
        };

        render(<ProductLinkWithImage {...props} />);
    });

    it("renders the link with the correct href", () => {
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/products/1/test-product");
    });

    it("renders the image with the correct src, alt, width, and height", () => {
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", "test.jpg");
        expect(image).toHaveAttribute("alt", "Test Image");
        expect(image).toHaveAttribute("width", "100");
        expect(image).toHaveAttribute("height", "100");
    });
});
