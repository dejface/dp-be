import { render, screen } from "@testing-library/react";
import Review from "./Review";

const mockReview = {
    reviewer: "John Doe",
    description: "This is a test review",
    image: {
        url: "https://example.com/image.jpg",
        width: 64,
        height: 64,
    },
};

describe("Review component", () => {
    beforeEach(() => {
        render(<Review {...mockReview} />);
    });

    test("correct layout classes", () => {
        expect(
            document.querySelector(
                ".column.is-one-third-desktop.is-full-mobile",
            ),
        ).toBeInTheDocument();

        expect(
            document.querySelector(".box.review.is-shadowless"),
        ).toBeInTheDocument();
    });

    test("correct description and icon", () => {
        const description = screen.getByText(mockReview.description);
        const icon = screen.getByTestId("quote-icon");

        expect(description).toHaveClass(
            "review__content review__content__description px-4 pb-3 pt-3",
        );
        expect(description.parentElement).toHaveClass("has-text-centered");

        expect(icon).toHaveClass("fa-icon");
        expect(icon.parentElement).toHaveClass("has-text-centered");
    });

    test("correct image", () => {
        const img = screen.getByRole("img");

        expect(img).toHaveClass("is-rounded");
        expect(img).toHaveAttribute("src", mockReview.image.url);
        expect(img).toHaveAttribute("alt", `Image of ${mockReview.reviewer}`);
        expect(img).toHaveAttribute("width", "64");
        expect(img).toHaveAttribute("height", "64");
        expect(img.parentElement).toHaveClass(
            "review__content has-text-centered",
        );
    });

    test("correct reviewer", () => {
        const reviewer = screen.getByText(mockReview.reviewer);

        expect(reviewer).toHaveClass("is-size-7 mt-2");
        expect(reviewer.parentElement).toHaveClass(
            "review__content has-text-centered",
        );
    });
});
