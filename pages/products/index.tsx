import React from "react";
import { fetchProductPreviews } from "@/src/api/fetch";
import { PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT } from "@/src/utils/constants";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
import { SupportedLocale } from "@/src/types/Types";
import { ProductPageProps, StaticProps } from "@/src/types/Page";
import { FilterProvider } from "@/src/hooks/filter/useFilter";
import ProductPageLayoutWithFilter from "@/src/components/page/ProductPageLayoutWithFilter";

const ProductsIndex = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ProductPageProps) => {
    return (
        <FilterProvider>
            <ProductPageLayoutWithFilter
                fetchedItems={fetchedItems}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </FilterProvider>
    );
};

export async function getStaticProps({
    locale,
}: StaticProps<string, SupportedLocale>) {
    return generateStaticProps(
        () =>
            fetchProductPreviews(PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT, locale, 1),
        1,
        PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    );
}

export default ProductsIndex;
