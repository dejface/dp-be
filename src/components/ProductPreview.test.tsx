import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPreview from "./ProductPreview";
import { useLanguage } from "@/src/hooks/useTranslation";

jest.mock("@/hooks/useTranslation");

const generateMockProduct = (lastPiecesText: string | undefined) => ({
    title: "Test Product",
    image: {
        url: "/test-image.jpg",
        description: "Test Image",
        width: 500,
        height: 500,
    },
    slug: "test-product",
    shortDescription: "This is a test product",
    price: 100,
    lastPiecesText,
    topProduct: false,
    category: {
        sys: {
            id: "test-category-id",
        },
        title: "Test Category",
    },
    description: "This is a test product",
});

describe("ProductPreview", () => {
    it("renders correctly with correct product details", () => {
        (useLanguage as jest.Mock).mockImplementationOnce(() => ["cs"]);

        render(
            <ProductPreview products={[generateMockProduct("last pieces")]} />,
        );
        const linkElement = screen.getByRole("link");
        const imageElement = screen.getByAltText("Test Image");
        const lastPiecesElement = screen.getByText("last pieces");
        const titleElement = screen.getByText("Test Product");
        const descriptionElement = screen.getByText("This is a test product");
        const priceElement = screen.getByText("100,00 Kč");
        const parentElementClass = "card-content is-paddingless has-text-left";

        expect(titleElement.parentElement).toHaveClass(parentElementClass);
        expect(titleElement).toHaveClass(
            "title",
            "is-size-6",
            "is-size-7-mobile",
            "pt-3",
            "is-marginless",
        );
        expect(descriptionElement.parentElement).toHaveClass(
            parentElementClass,
        );
        expect(descriptionElement).toHaveClass(
            "is-italic",
            "is-size-7",
            "pt-1",
        );
        expect(priceElement.parentElement).toHaveClass(parentElementClass);
        expect(priceElement).toHaveClass("is-size-7", "has-text-weight-medium");

        expect(linkElement.parentElement).toHaveClass("image is-3by4");
        expect(linkElement).toHaveAttribute(
            "href",
            "/products/product/test-product",
        );

        expect(imageElement).toHaveAttribute("width", "500");
        expect(imageElement).toHaveAttribute("height", "500");
        expect(imageElement).toHaveAttribute("src", "/test-image.jpg");

        expect(lastPiecesElement).toHaveClass("m-2 is-size-7");
        expect(lastPiecesElement.parentElement).toHaveClass(
            "product__lastPiecesText is-italic is-size-6 has-text-centered has-background-white has-text-black",
        );
    });

    it("renders correctly with correct product details", () => {
        (useLanguage as jest.Mock).mockImplementationOnce(() => ["sk"]);

        render(<ProductPreview products={[generateMockProduct(undefined)]} />);
        const lastPiecesElement = screen.queryByText("last pieces");

        expect(screen.getByText("100,00 €")).toBeInTheDocument();
        expect(lastPiecesElement).not.toBeInTheDocument();
    });
});
