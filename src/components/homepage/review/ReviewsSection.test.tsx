import { render, screen } from "@testing-library/react";
import ReviewsSection from "./ReviewsSection";

jest.mock("./Review", () => {
    return function DummyReview() {
        return <div data-testid="dummy-review" />;
    };
});

const mockReviews = [
    {
        reviewer: "John Doe",
        description: "This is a test review",
        image: {
            url: "https://example.com/image.jpg",
            width: 64,
            height: 64,
        },
    },
    {
        reviewer: "Jane Doe",
        description: "This is another test review",
        image: {
            url: "https://example.com/image2.jpg",
            width: 64,
            height: 64,
        },
    },
];

describe("ReviewsSection component", () => {
    test("correct number of reviews and layout class", () => {
        render(<ReviewsSection reviews={mockReviews} />);
        const reviews = screen.queryAllByTestId("dummy-review");

        expect(reviews).toHaveLength(2);
        reviews.forEach((review) => {
            expect(review.parentElement).toHaveClass(
                "columns reviews__section is-multiline is-paddingless is-marginless pt-6 px-1-mobile",
            );
        });
    });
});
