import { PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT } from "@/src/utils/constants";
import { fetchProductPreviews, fetchTotalProductCount } from "@/src/api/fetch";
import React from "react";
import { SupportedLocale } from "@/src/types/Types";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
import { generateStaticPaths } from "@/src/utils/generateStaticPaths";
import { ProductPageProps, StaticProps } from "@/src/types/Page";
import ProductPageLayout from "@/src/components/page/ProductPageLayout";

const ProductsPaginatedPage = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ProductPageProps) => {
    return (
        <ProductPageLayout
            fetchedItems={fetchedItems}
            totalPages={totalPages}
            currentPage={currentPage}
        />
    );
};

export async function getStaticPaths() {
    return generateStaticPaths(
        fetchTotalProductCount,
        PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    );
}

export async function getStaticProps({
    params,
    locale,
}: StaticProps<number, SupportedLocale>) {
    return generateStaticProps(
        fetchProductPreviews,
        locale,
        params.page,
        PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    );
}

export default ProductsPaginatedPage;
