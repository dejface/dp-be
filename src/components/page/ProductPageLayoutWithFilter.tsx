import React, { useEffect, useState } from "react";
import ProductPreview from "@/src/components/ProductPreview";
import Layout from "@/src/components/Layout";
import { ProductPageProps } from "@/src/types/Page";
import { PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT } from "@/src/utils/constants";
import { useLanguage, useTranslation } from "@/src/hooks/useTranslation";
import { filterProducts } from "@/src/components/filter/utils/filterProducts";
import FilterBar from "@/src/components/filter/FilterBar";
import useGenerateProductFilterOptions from "@/src/hooks/filter/useGenerateProductFilterOptions";
import { useFilter } from "@/src/hooks/filter/useFilter";
import { fetchProductPreviews } from "@/src/api/fetch";
import { Product } from "@/src/types/Product";
import PaginatedPageLayout from "@/src/components/pagination/PaginatedPageLayout";
import ShowMorePagination from "@/src/components/pagination/ShowMorePagination";

const ProductPageLayoutWithFilter = ({
    fetchedItems,
    totalPages,
    currentPage,
}: ProductPageProps) => {
    const [products, setProducts] = useState<Product[]>(fetchedItems ?? []);
    const [page, setPage] = useState(currentPage);
    const [selectedFilter, setSelectedFilter] = useFilter();
    const [locale] = useLanguage();
    const trans = useTranslation();

    const filterOptions = useGenerateProductFilterOptions();

    useEffect(() => {
        setProducts(fetchedItems ?? []);
    }, [fetchedItems, locale]);

    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filterOptions[filter]);
    };

    const loadMoreProducts = async (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        event.preventDefault();
        const updatedPage = page + 1;
        const fetchedProducts = await fetchProductPreviews(
            PRODUCT_COUNT_PRODUCTS_PAGE_LIMIT,
            locale,
            updatedPage,
        );
        setProducts((prev) => [
            ...prev,
            ...(fetchedProducts?.data as Product[]),
        ]);
        setPage(updatedPage);
    };

    const filteredProducts = filterProducts(products, selectedFilter);

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
                itemComponent={<ProductPreview products={filteredProducts} />}
                paginationComponent={
                    page < totalPages &&
                    !selectedFilter && (
                        <ShowMorePagination
                            onClick={(e) => loadMoreProducts(e)}
                            text={trans("app.products.show_more")}
                        />
                    )
                }
            />
        </Layout>
    );
};

export default ProductPageLayoutWithFilter;
