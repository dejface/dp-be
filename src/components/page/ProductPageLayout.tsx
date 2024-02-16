import React, { useEffect, useState } from "react";
import ProductPreview from "@/src/components/ProductPreview";
import PaginatedPageLayout from "@/src/components/PaginatedPageLayout";
import Layout from "@/src/components/Layout";
import { ProductPageProps } from "@/src/types/Page";
import { CATEGORY, PRODUCTS_PATH } from "@/src/utils/constants";
import { useTranslation } from "@/src/hooks/useTranslation";
import { FilterProductsCriteria } from "@/src/types/Filter";
import { filterProducts } from "@/src/components/filter/utils/filterProducts";
import FilterBar from "@/src/components/filter/FilterBar";
import {
    fetchTotalCount,
    fetchTotalProductCountByCategory,
} from "@/src/api/fetch";
import useGenerateProductFilterOptions from "@/src/hooks/filter/useGenerateProductFilterOptions";

const ProductPageLayout = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ProductPageProps) => {
    const trans = useTranslation();
    const [selectedFilter, setSelectedFilter] =
        useState<FilterProductsCriteria | null>(null);
    const [totalFilteredPages, setTotalFilteredPages] =
        useState<string>(totalPages);

    useEffect(() => {
        if (!selectedFilter) {
            return;
        }
        const fetchCount = async () => {
            if (selectedFilter.type === CATEGORY) {
                const count = await fetchTotalProductCountByCategory(
                    selectedFilter.id,
                );
                setTotalFilteredPages(`${count ?? 0}`);
            } else {
                const count = await fetchTotalCount(
                    "productCollection",
                    selectedFilter.id,
                );
                setTotalFilteredPages(`${count ?? 0}`);
            }
        };

        fetchCount();
    }, [selectedFilter]);

    const filterOptions = useGenerateProductFilterOptions();

    // TODO: maybe add loading spinner/skeleton/No articles found page
    if (!fetchedItems) {
        return <div>loading...</div>;
    }
    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filterOptions[filter]);
    };

    const filteredProducts = filterProducts(fetchedItems, selectedFilter);

    const productComponent = (
        <ProductPreview
            products={filteredProducts}
            totalPages={totalFilteredPages}
            currentPage={currentPage}
        />
    );

    return (
        <Layout>
            <FilterBar
                filters={[
                    trans("app.best_seller"),
                    trans("app.new_arrivals"),
                    trans("app.earrings"),
                    trans("app.rings"),
                    trans("app.necklaces"),
                ]}
                onFilterSelect={handleFilterSelect}
                activeFilter={selectedFilter?.name}
            />
            <PaginatedPageLayout
                itemComponent={productComponent}
                totalPages={totalFilteredPages}
                currentPage={currentPage}
                paginationPath={`/${PRODUCTS_PATH}`}
            />
        </Layout>
    );
};

export default ProductPageLayout;
