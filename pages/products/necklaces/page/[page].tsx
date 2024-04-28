import React from "react";
import {
    fetchProductPreviews,
    fetchTotalProductCountByCategory,
} from "@/src/api/fetch";
import {
    NECKLACES_ID,
    NECKLACES_PATH,
    PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    PRODUCTS_PATH,
} from "@/src/utils/constants";
import { generateStaticPropsForPagination } from "@/src/utils/generateStaticPropsForPagination";
import { SupportedLocale } from "@/src/types/Types";
import { ProductPageProps, StaticProps } from "@/src/types/Page";
import ProductPageLayout from "@/src/components/page/ProductPageLayout";
import { generateStaticPaths } from "@/src/utils/generateStaticPaths";

const NecklacesPaginatedPage = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ProductPageProps) => {
    return (
        <ProductPageLayout
            fetchedItems={fetchedItems}
            totalPages={totalPages}
            currentPage={currentPage}
            path={`/${PRODUCTS_PATH}/${NECKLACES_PATH}`}
        />
    );
};

export async function getStaticPaths() {
    return generateStaticPaths(
        () => fetchTotalProductCountByCategory(NECKLACES_ID),
        PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    );
}

export async function getStaticProps({
    params,
    locale,
}: StaticProps<string, SupportedLocale>) {
    return generateStaticPropsForPagination(
        () =>
            fetchProductPreviews(
                PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
                locale,
                parseInt(params.page),
                NECKLACES_ID,
            ),
        parseInt(params.page),
        PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    );
}

export default NecklacesPaginatedPage;
