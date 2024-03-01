import { render, screen } from "@testing-library/react";
import CarouselItem from "@/src/components/homepage/carousel/CarouselItem";
import { generateMockProduct } from "../../../../test/helpers/generateMockProduct";

jest.mock("@/hooks/useTranslation", () => {
    return {
        useLanguage: () => ["en"],
    };
});

const mockProducts = [
    generateMockProduct("left"),
    generateMockProduct("middle"),
    generateMockProduct("right"),
];

describe("CarouselItem", () => {
    beforeEach(() => {
        const slideLeft = jest.fn();
        const slideRight = jest.fn();

        mockProducts.forEach((mockProduct, index) => {
            render(
                <CarouselItem
                    product={mockProduct}
                    index={index}
                    slideLeft={slideLeft}
                    slideRight={slideRight}
                />,
            );
        });
    });

    test("left image in carousel elements", () => {
        const figure = screen.getAllByRole("figure")[0];
        const image = screen.getAllByRole("img")[0];
        const link = screen.getAllByRole("link")[0];
        const title = screen.getByText("Test Product left");

        expect(figure.parentElement).toHaveClass(
            "column carousel__item is-paddingless is-4 ml-3",
        );
        expect(figure).toHaveClass("carousel__item image is-3by4 mr-3");
        expect(figure.firstElementChild).toHaveClass(
            "button is-transparent carousel__button-left",
        );
        expect(figure.firstElementChild?.firstElementChild).toHaveClass(
            "fa-icon-left",
        );

        expect(image).toHaveAttribute("src", "/test-image.jpg");
        expect(image).toHaveAttribute("alt", "Test Product left");
        expect(image).toHaveAttribute("width", "500");
        expect(image).toHaveAttribute("height", "500");

        expect(link).toHaveAttribute(
            "href",
            "/products/product/test-product-left",
        );

        expect(title).toHaveTextContent("Test Product left");
        expect(title).toHaveClass(
            "has-text-weight-bold has-text-left is-size-7 mt-3",
        );
    });

    test("middle image in carousel elements", () => {
        const figure = screen.getAllByRole("figure")[1];
        const image = screen.getAllByRole("img")[1];
        const link = screen.getAllByRole("link")[1];
        const title = screen.getByText("Test Product middle");

        expect(figure.parentElement).toHaveClass(
            "column carousel__item is-paddingless is-4",
        );
        expect(figure).toHaveClass("carousel__item image is-3by4 mr-3");
        expect(figure.firstElementChild).toBe(link);

        expect(image).toHaveAttribute("src", "/test-image.jpg");
        expect(image).toHaveAttribute("alt", "Test Product middle");
        expect(image).toHaveAttribute("width", "500");
        expect(image).toHaveAttribute("height", "500");

        expect(link).toHaveAttribute(
            "href",
            "/products/product/test-product-middle",
        );

        expect(title).toHaveTextContent("Test Product middle");
        expect(title).toHaveClass(
            "has-text-weight-bold has-text-left is-size-7 mt-3",
        );
    });

    test("right image in carousel elements", () => {
        const figure = screen.getAllByRole("figure")[2];
        const image = screen.getAllByRole("img")[2];
        const link = screen.getAllByRole("link")[2];
        const title = screen.getByText("Test Product right");

        expect(figure.parentElement).toHaveClass(
            "column carousel__item is-paddingless is-4",
        );
        expect(figure).toHaveClass("carousel__item image is-3by4 mr-5");
        expect(figure.firstElementChild).toHaveClass(
            "button is-transparent carousel__button-right",
        );
        expect(figure.firstElementChild?.firstElementChild).toHaveClass(
            "fa-icon-right",
        );

        expect(image).toHaveAttribute("src", "/test-image.jpg");
        expect(image).toHaveAttribute("alt", "Test Product right");
        expect(image).toHaveAttribute("width", "500");
        expect(image).toHaveAttribute("height", "500");

        expect(link).toHaveAttribute(
            "href",
            "/products/product/test-product-right",
        );

        expect(title).toHaveTextContent("Test Product right");
        expect(title).toHaveClass(
            "has-text-weight-bold has-text-left is-size-7 mt-3",
        );
    });
});
