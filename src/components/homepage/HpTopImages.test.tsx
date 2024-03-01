import React from "react";
import { render, screen } from "@testing-library/react";
import HpTopImages from "@/src/components/homepage/HpTopImages";
import { HpTopImage } from "@/src/types/Image";

const mockImages: HpTopImage[] = [
    {
        title: "Left image",
        url: "https://example.com/image1.jpg",
        width: 500,
        height: 500,
    },
    {
        title: "Right image",
        url: "https://example.com/image2.jpg",
        width: 500,
        height: 500,
    },
];

describe("HpTopImages", () => {
    test("correct number of images and layout class present", () => {
        render(
            <HpTopImages
                leftImage={mockImages[0]}
                rightImage={mockImages[1]}
            />,
        );
        const images = screen.getAllByRole("img");
        expect(images.length).toBe(2);
        expect(
            document.querySelector(".columns.is-variable.is-1.is-mobile.mt-4"),
        ).toBeInTheDocument();
    });

    it("renders the images with correct attributes and classes", () => {
        render(
            <HpTopImages
                leftImage={mockImages[0]}
                rightImage={mockImages[1]}
            />,
        );
        const images = screen.getAllByRole("img") as HTMLImageElement[];
        images.forEach((image, index) => {
            expect(image.src).toBe(mockImages[index].url);
            expect(image.alt).toBe(mockImages[index].title);
            expect(image.width).toBe(mockImages[index].width);
            expect(image.height).toBe(mockImages[index].height);
        });

        expect(
            document.querySelectorAll(".column.is-6.p-0-mobile.pt-0"),
        ).toHaveLength(2);
        expect(document.querySelectorAll(".image.is-4by3")).toHaveLength(2);
    });
});
