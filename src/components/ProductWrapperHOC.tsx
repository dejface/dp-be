import React, { useEffect } from "react";
import Layout from "@/src/components/Layout";
import { useRouter } from "next/router";
import { SlugPair } from "@/src/types/Slugs";
import { Product } from "@/src/types/Product";
import ProductDetail from "@/src/components/product-detail/ProductDetail";
import ProductBreadcrumbs from "@/src/components/product-detail/ProductBreadcrumbs";
import { useProductSlugs } from "@/src/contexts/ProductSlugsContext";

interface ProductWrapperProps {
    parsedContent: Product | null;
    slugs: SlugPair[];
}

export const ProductWrapperHOC = () => {
    const ProductWrapper = ({ parsedContent, slugs }: ProductWrapperProps) => {
        const router = useRouter();
        const [, setSlugs] = useProductSlugs();

        useEffect(() => {
            setSlugs(slugs);
        }, [slugs]);

        if (!parsedContent || router.isFallback) {
            return <div>Loading...</div>;
        }

        return (
            <Layout>
                <ProductBreadcrumbs
                    title={parsedContent.title}
                    categoryId={parsedContent.category.sys.id}
                />
                <ProductDetail product={parsedContent} />
            </Layout>
        );
    };

    return ProductWrapper;
};
