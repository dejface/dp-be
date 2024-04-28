import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPreview from "./ProductPreview";
import { generateMockProduct } from "../../test/helpers/generateMockProduct";
import { useLanguage } from "@/src/contexts/TransContext";

jest.mock("@/contexts/TransContext");
jest.mock("@/utils/getPathByCategoryId", () => ({
    getPathByCategoryId: jest.fn((categoryId: string) => {
        return `${categoryId}`;
    }),
}));

describe("ProductPreview", () => {
    it("renders correctly with correct product details", () => {
        (useLanguage as jest.Mock).mockImplementationOnce(() => ["cs"]);

        render(
            <ProductPreview
                products={[
                    generateMockProduct("id", "categoryId", "last pieces"),
                ]}
            />,
        );
        const linkElement = screen.getByRole("link");
        const imageElement = screen.getByAltText("Test Image");
        const lastPiecesElement = screen.getByText("last pieces");
        const titleElement = screen.getByText("Test Product id");
        const descriptionElement = screen.getByText("This is a test product");
        const priceElement = screen.getByText("100,00 Kč");
        const parentElementClass = "card-content is-paddingless has-text-left";

        expect(titleElement.parentElement).toHaveClass(parentElementClass);
        expect(titleElement).toHaveClass("product__title pt-3 is-marginless");
        expect(descriptionElement.parentElement).toHaveClass(
            parentElementClass,
        );
        expect(descriptionElement).toHaveClass(
            "product__description is-italic",
        );
        expect(priceElement.parentElement).toHaveClass(parentElementClass);
        expect(priceElement).toHaveClass(
            "product__price has-text-weight-medium",
        );

        expect(linkElement.parentElement).toHaveClass("image is-3by4");
        expect(linkElement).toHaveAttribute(
            "href",
            "/products/categoryId/test-product-id",
        );

        expect(imageElement).toHaveAttribute("width", "500");
        expect(imageElement).toHaveAttribute("height", "500");
        expect(imageElement).toHaveAttribute("src", "/test-image.jpg");
        expect(imageElement.parentElement?.parentElement).toHaveClass(
            "image is-3by4",
        );
        expect(
            imageElement.parentElement?.parentElement?.parentElement,
        ).toHaveClass("card-image");
        expect(
            imageElement.parentElement?.parentElement?.parentElement,
        ).toHaveClass("card-image");
        expect(
            imageElement.parentElement?.parentElement?.parentElement
                ?.parentElement,
        ).toHaveClass("card is-shadowless");
        expect(
            imageElement.parentElement?.parentElement?.parentElement
                ?.parentElement?.parentElement,
        ).toHaveClass(
            "column is-one-quarter-desktop is-one-quarter-tablet is-one-third-mobile",
        );

        expect(lastPiecesElement).toHaveClass("m-2");
        expect(lastPiecesElement.parentElement).toHaveClass(
            "product__lastPiecesText is-italic has-text-centered has-background-custom-white",
        );
    });

    it("renders correctly with correct product details", () => {
        (useLanguage as jest.Mock).mockImplementationOnce(() => ["sk"]);

        render(<ProductPreview products={[generateMockProduct("id")]} />);
        const lastPiecesElement = screen.queryByText("last pieces");

        expect(screen.getByText("100,00 €")).toBeInTheDocument();
        expect(lastPiecesElement).not.toBeInTheDocument();
    });
});
