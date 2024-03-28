import React from "react";
import { render, screen } from "@testing-library/react";
import { EARRINGS_ID, NECKLACES_ID, RINGS_ID } from "@/src/utils/constants";
import ProductBreadcrumbs from "@/src/components/product-detail/ProductBreadcrumbs";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.homepage.title": "Domu",
        "app.earrings": "Nausnice",
        "app.necklaces": "Nahrdelniky",
        "app.rings": "Prsteny",
    });
});

describe("ProductBreadcrumbs", () => {
    test("home link", () => {
        render(
            <ProductBreadcrumbs title={"Title"} categoryId={NECKLACES_ID} />,
        );

        const homeLink = screen.getByText("DOMU");

        expect(homeLink).toHaveClass("breadcrumb__item");
        expect(homeLink.closest("a")).toHaveAttribute("href", "/");
        expect(screen.getByRole("navigation")).toHaveClass(
            "breadcrumb is-small mt-4",
        );
        expect(screen.queryAllByRole("link")).toHaveLength(3);
    });

    test("title classes", () => {
        render(
            <ProductBreadcrumbs title={"Title"} categoryId={NECKLACES_ID} />,
        );

        const titleLink = screen.getByText("TITLE");

        expect(titleLink).toHaveClass("breadcrumb__item-active");
        expect(titleLink.closest("a")).toHaveAttribute("href", "#");
        expect(titleLink.closest("li")).toHaveClass("is-active");
    });

    it.each([
        ["necklaces", NECKLACES_ID, "NAHRDELNIKY"],
        ["rings", RINGS_ID, "PRSTENY"],
        ["earrings", EARRINGS_ID, "NAUSNICE"],
    ])(
        "category link %s",
        (categoryPath, categoryId, translatedCategoryTitle) => {
            render(
                <ProductBreadcrumbs title={"Title"} categoryId={categoryId} />,
            );

            const categoryTitle = screen.getByText(translatedCategoryTitle);

            expect(categoryTitle).toHaveClass("breadcrumb__item");
            expect(categoryTitle.closest("a")).toHaveAttribute(
                "href",
                `/products/${categoryPath}`,
            );
        },
    );

    test("category link not presented when categoryId is not valid", () => {
        render(<ProductBreadcrumbs title={"Title"} categoryId={"invalid"} />);

        const categoryLinks = screen.queryAllByRole("link");

        expect(categoryLinks).toHaveLength(2);
    });
});
