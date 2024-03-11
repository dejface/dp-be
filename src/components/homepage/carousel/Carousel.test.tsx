import { render, screen } from "@testing-library/react";
import Carousel from "@/src/components/homepage/carousel/Carousel";
import { generateMockProduct } from "../../../../test/helpers/generateMockProduct";
import { userEvent } from "@testing-library/user-event";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../../test/helpers/useTransMock");
    return useTransMock({
        "app.top_products.title": "Top Products",
    });
});

const mockProducts = [
    generateMockProduct("1"),
    generateMockProduct("2"),
    generateMockProduct("3"),
];

describe("Carousel", () => {
    beforeEach(() => {
        render(<Carousel products={mockProducts} />);
    });

    test("correct title and parent classes", () => {
        const title = screen.getByText("Top Products");
        expect(screen.getByText("Top Products")).toHaveClass(
            "title ml-0 pb-3 top-product__title is-size-3-desktop is-size-5-tablet is-size-6-mobile",
        );
        expect(title.parentElement).toHaveClass(
            "section pb-6 is-paddingless px-1-mobile",
        );
    });

    test("slides left correctly", async () => {
        const leftButton = screen.getAllByRole("button")[0];

        const initialOrder = screen.getAllByText(/Test Product/i);
        expect(initialOrder[0]).toHaveTextContent("Test Product 1");
        expect(initialOrder[1]).toHaveTextContent("Test Product 2");
        expect(initialOrder[2]).toHaveTextContent("Test Product 3");

        await userEvent.click(leftButton);

        const newOrder = screen.getAllByText(/Test Product/i);
        expect(newOrder[0]).toHaveTextContent("Test Product 2");
        expect(newOrder[1]).toHaveTextContent("Test Product 3");
        expect(newOrder[2]).toHaveTextContent("Test Product 1");
    });

    test("slides right correctly", async () => {
        const rightButton = screen.getAllByRole("button")[1];

        const initialOrder = screen.getAllByText(/Test Product/i);
        expect(initialOrder[0]).toHaveTextContent("Test Product 1");
        expect(initialOrder[1]).toHaveTextContent("Test Product 2");
        expect(initialOrder[2]).toHaveTextContent("Test Product 3");

        await userEvent.click(rightButton);

        const newOrder = screen.getAllByText(/Test Product/i);
        expect(newOrder[0]).toHaveTextContent("Test Product 3");
        expect(newOrder[1]).toHaveTextContent("Test Product 1");
        expect(newOrder[2]).toHaveTextContent("Test Product 2");
    });
});
