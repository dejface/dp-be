import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductThumbnails from "@/src/components/product-detail/ProductThumbnails";

const mockSetSelectedImage = jest.fn();
const mockImages = [
    { url: "test1.jpg", width: 100, height: 100, description: "test1" },
    { url: "test2.jpg", width: 100, height: 100, description: "test2" },
];

describe("ProductThumbnails", () => {
    it("calls setSelectedImage when an image is clicked", async () => {
        render(
            <ProductThumbnails
                imageGallery={mockImages}
                setSelectedImage={mockSetSelectedImage}
            />,
        );
        await userEvent.click(screen.getByAltText("thumbnail 0"));
        expect(mockSetSelectedImage).toHaveBeenCalledWith(mockImages[0]);
    });

    test("correct number of thumbnails", () => {
        render(
            <ProductThumbnails
                imageGallery={mockImages}
                setSelectedImage={mockSetSelectedImage}
            />,
        );
        expect(screen.getAllByAltText(/thumbnail \d/)).toHaveLength(2);
    });

    test("correct classes", () => {
        render(
            <ProductThumbnails
                imageGallery={mockImages}
                setSelectedImage={mockSetSelectedImage}
            />,
        );
        const thumbnail = screen.getByAltText("thumbnail 0");

        expect(thumbnail.parentElement).toHaveClass("thumbnail mb-3");
        expect(thumbnail.parentElement?.parentElement).toHaveClass(
            "thumbnails is-flex is-flex-direction-column",
        );
        expect(
            thumbnail.parentElement?.parentElement?.parentElement,
        ).toHaveClass("column is-2");
    });
});
