import React from "react";
import { render, screen } from "@testing-library/react";
import InstaGallery from "@/src/components/homepage/InstaGallery";
import { InstaPost } from "@/src/types/InstaPost";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.instagram_gallery.title": "Gallery title",
    });
});

const generateMockPosts = (numPosts: number): InstaPost[] => {
    let mockPosts: InstaPost[] = [];

    for (let i = 1; i <= numPosts; i++) {
        mockPosts.push({
            url: `https://instagram.com/post${i}`,
            image: {
                url: `https://example.com/image${i}.jpg`,
                width: 500,
                height: 500,
            },
            caption: `This is the post number ${i}`,
            author: `Author${i}`,
        });
    }

    return mockPosts;
};

describe("InstaGallery", () => {
    describe("check correct render and proper classes", () => {
        beforeEach(() => {
            render(<InstaGallery instaPosts={generateMockPosts(1)} />);
        });

        it("correct render and classnames in layout", () => {
            expect(
                document.querySelector(
                    ".section.pt-4.pb-6.is-small.is-paddingless.px-1-mobile",
                ),
            ).toBeInTheDocument();
            expect(
                document.querySelector(".columns.is-variable.is-2.is-mobile"),
            ).toBeInTheDocument();
            expect(
                document.querySelector(".column.is-paddingless"),
            ).toBeInTheDocument();
            expect(document.querySelectorAll(".column")).toHaveLength(1);
        });

        test("correct title", () => {
            const title = screen.getByText("Gallery title");
            expect(title).toHaveClass(
                "insta__section-title is-marginless pb-5",
            );
        });

        test("correct image", () => {
            const image = screen.getByRole("img");
            expect(image).toHaveClass("insta__image");
            expect(image).toHaveAttribute(
                "src",
                "https://example.com/image1.jpg",
            );
            expect(image).toHaveAttribute("alt", "Instagram post");
            expect(image).toHaveAttribute("width", "500");
            expect(image).toHaveAttribute("height", "500");
            expect(image.parentElement).toHaveClass(
                "image is-square mr-2 ml-2",
            );
            expect(image.parentElement?.parentElement).toHaveAttribute(
                "href",
                "https://instagram.com/post1",
            );
        });

        test("correct caption", () => {
            const caption = screen.getByText("This is the post number 1");
            expect(caption).toHaveClass("insta__caption is-hidden-mobile");
        });

        test("correct author", () => {
            const author = screen.getByText("Author1");
            expect(author).toHaveClass("insta__author is-hidden-mobile");
        });
    });

    describe("correct section size class", () => {
        test.each([
            [4, ".is-3"],
            [5, ".is-2.insta__gallery"],
            [6, ".is-2"],
        ])(
            "should return correct class for %d posts",
            (numberOfPosts: number, customClass: string) => {
                render(
                    <InstaGallery
                        instaPosts={generateMockPosts(numberOfPosts)}
                    />,
                );
                expect(
                    document.querySelector(
                        `.column${customClass}.is-paddingless`,
                    ),
                ).toBeInTheDocument();
                expect(document.querySelectorAll(".column")).toHaveLength(
                    numberOfPosts,
                );
            },
        );
    });
});
