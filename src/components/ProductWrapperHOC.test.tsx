import { ProductWrapperHOC } from "@/src/components/ProductWrapperHOC";
import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { useProductSlugs } from "@/src/contexts/ProductSlugsContext";
import { useRouter } from "next/router";
import { generateMockProduct } from "../../test/helpers/generateMockProduct";

jest.mock("@vercel/analytics/react", () => ({
    Analytics: function DummyAnalytics() {
        return <div data-testid="analytics">Analytics</div>;
    },
}));

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/contexts/ProductSlugsContext", () => ({
    useProductSlugs: jest.fn(),
}));

jest.mock("@/components/product-detail/ProductBreadcrumbs", () => {
    return function DummyProductBreadcrumbs() {
        return <div data-testid="product-breadcrumbs">ProductBreadcrumbs</div>;
    };
});

jest.mock("@/components/product-detail/ProductDetail", () => {
    return function DummyProductDetail() {
        return <div data-testid="product-detail">ProductDetail</div>;
    };
});

jest.mock("@/components/Layout", () => {
    return function DummyLayout({ children }: { children: ReactNode }) {
        return <div data-testid="layout">{children}</div>;
    };
});

describe("ProductWrapperHOC", () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            isFallback: false,
        });
        (useProductSlugs as jest.Mock).mockReturnValue([[], jest.fn()]);
    });

    it("renders loading state when parsedContent is null", () => {
        const ProductWrapper = ProductWrapperHOC();
        render(<ProductWrapper parsedContent={null} slugs={[]} />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders loading state when isFallback is true", () => {
        (useRouter as jest.Mock).mockReturnValue({
            isFallback: true,
        });
        const ProductWrapper = ProductWrapperHOC();
        render(
            <ProductWrapper
                parsedContent={generateMockProduct("id")}
                slugs={[]}
            />,
        );
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders product wrapper component", () => {
        const ProductWrapper = ProductWrapperHOC();
        render(
            <ProductWrapper
                parsedContent={generateMockProduct("id")}
                slugs={[]}
            />,
        );
        expect(screen.getByTestId("layout")).toBeInTheDocument();
        expect(screen.getByTestId("product-breadcrumbs")).toBeInTheDocument();
        expect(screen.getByTestId("product-detail")).toBeInTheDocument();
    });
});
