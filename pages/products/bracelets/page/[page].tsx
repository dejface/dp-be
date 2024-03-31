import React from "react";
import {
    fetchProductPreviews,
    fetchTotalProductCountByCategory,
} from "@/src/api/fetch";
import {
    BRACELETS_ID,
    BRACELETS_PATH,
    PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    PRODUCTS_PATH,
} from "@/src/utils/constants";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
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
            path={`/${PRODUCTS_PATH}/${BRACELETS_PATH}`}
        />
    );
};

export async function getStaticPaths() {
    return generateStaticPaths(
        () => fetchTotalProductCountByCategory(BRACELETS_ID),
        PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    );
}

export async function getStaticProps({
    params,
    locale,
}: StaticProps<string, SupportedLocale>) {
    return generateStaticProps(
        () =>
            fetchProductPreviews(
                PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
                locale,
                parseInt(params.page),
                BRACELETS_ID,
            ),
        parseInt(params.page),
        PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    );
}

export default NecklacesPaginatedPage;
