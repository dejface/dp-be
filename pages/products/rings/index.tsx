import React from "react";
import { fetchProductPreviews } from "@/src/api/fetch";
import {
    PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    PRODUCTS_PATH,
    RINGS_ID,
    RINGS_PATH,
} from "@/src/utils/constants";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
import { SupportedLocale } from "@/src/types/Types";
import { ProductPageProps, StaticProps } from "@/src/types/Page";
import ProductPageLayout from "@/src/components/page/ProductPageLayout";

const EarringsIndex = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ProductPageProps) => {
    return (
        <ProductPageLayout
            fetchedItems={fetchedItems}
            totalPages={totalPages}
            currentPage={currentPage}
            path={`/${PRODUCTS_PATH}/${RINGS_PATH}`}
        />
    );
};

export async function getStaticProps({
    locale,
}: StaticProps<string, SupportedLocale>) {
    return generateStaticProps(
        () =>
            fetchProductPreviews(
                PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
                locale,
                1,
                RINGS_ID,
            ),
        1,
        PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    );
}

export default EarringsIndex;
