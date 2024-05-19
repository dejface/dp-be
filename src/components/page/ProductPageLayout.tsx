import React from "react";
import ProductPreview from "@/src/components/ProductPreview";
import Layout from "@/src/components/Layout";
import { ProductPageProps } from "@/src/types/Page";
import PaginatedPageLayout from "@/src/components/pagination/PaginatedPageLayout";
import NumberedPagination from "@/src/components/pagination/NumberedPagination";

const ProductPageLayout = ({
    fetchedItems,
    totalPages,
    currentPage,
    path,
}: ProductPageProps) => {
    // TODO: Add loading spinner/skeleton/No articles found page
    if (!fetchedItems) {
        return <div>loading...</div>;
    }

    return (
        <Layout>
            <PaginatedPageLayout
                itemComponent={<ProductPreview products={fetchedItems} />}
                paginationComponent={
                    <NumberedPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        path={path ?? ""}
                    />
                }
            />
        </Layout>
    );
};

export default ProductPageLayout;
