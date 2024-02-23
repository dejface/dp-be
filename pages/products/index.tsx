import React from "react";
import { fetchProductPreviews } from "@/src/api/fetch";
import { PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT } from "@/src/utils/constants";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
import { SupportedLocale } from "@/src/types/Types";
import { ProductPageProps, StaticProps } from "@/src/types/Page";
import ProductPageLayout from "@/src/components/page/ProductPageLayout";
import { FilterProvider } from "@/src/hooks/filter/useFilter";

const ProductsIndex = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ProductPageProps) => {
    return (
        <FilterProvider>
            <ProductPageLayout
                fetchedItems={fetchedItems}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </FilterProvider>
    );
};

export async function getStaticProps({
    locale,
}: StaticProps<number, SupportedLocale>) {
    return generateStaticProps(
        fetchProductPreviews,
        locale,
        1,
        PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    );
}

export default ProductsIndex;
