import React from "react";
import { fetchProductPreviews } from "@/src/api/fetch";
import {
    BRACELETS_ID,
    BRACELETS_PATH,
    PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    PRODUCTS_PATH,
} from "@/src/utils/constants";
import { generateStaticPropsForPagination } from "@/src/utils/generateStaticPropsForPagination";
import { SupportedLocale } from "@/src/types/Types";
import { ProductPageProps, StaticProps } from "@/src/types/Page";
import ProductPageLayout from "@/src/components/page/ProductPageLayout";

const NecklacesIndex = ({
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

export async function getStaticProps({
    locale,
}: StaticProps<string, SupportedLocale>) {
    return generateStaticPropsForPagination(
        () =>
            fetchProductPreviews(
                PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
                locale,
                1,
                BRACELETS_ID,
            ),
        1,
        PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    );
}

export default NecklacesIndex;
