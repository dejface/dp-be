import {
    PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
    PRODUCTS_PATH,
} from "@/src/utils/constants";
import { fetchProductPreviews, fetchTotalProductCount } from "@/src/api/fetch";
import React from "react";
import { SupportedLocale } from "@/src/types/Types";
import ProductPreview from "@/src/components/ProductPreview";
import PaginatedPageLayout from "@/src/components/PaginatedPageLayout";
import { generateStaticProps } from "@/src/utils/generateStaticProps";
import { generateStaticPaths } from "@/src/utils/generateStaticPaths";
import { ProductPageProps, StaticProps } from "@/src/types/Page";
import Layout from "@/src/components/Layout";

const ProductsPaginatedPage = ({
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
        <Layout>
            <PaginatedPageLayout
                itemComponent={productComponent}
                totalPages={totalPages}
                currentPage={currentPage}
                paginationPath={`/${PRODUCTS_PATH}`}
            />
        </Layout>
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
