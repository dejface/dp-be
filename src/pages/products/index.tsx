import React from "react";
import { fetchProductPreviews } from "@/src/api/fetch";
import {
    PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    PRODUCTS_PATH,
} from "@/src/utils/constants";
import ProductPreview from "@/src/components/ProductPreview";
import PaginatedPageLayout from "@/src/components/PaginatedPageLayout";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
import { SupportedLocale } from "@/src/types/Types";
import { ProductPageProps, StaticProps } from "@/src/types/Page";

const ProductsIndex = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ProductPageProps) => {
    // TODO: maybe add loading spinner/skeleton/No articles found page
    if (!fetchedItems) {
        return <div>loading...</div>;
    }

    const productComponent = (
        <ProductPreview
            products={fetchedItems}
            totalPages={totalPages}
            currentPage={currentPage}
        />
    );

    return (
        <PaginatedPageLayout
            itemComponent={productComponent}
            totalPages={totalPages}
            currentPage={currentPage}
            paginationPath={`/${PRODUCTS_PATH}`}
        />
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
