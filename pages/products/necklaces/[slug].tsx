import { fetchProductBySlug } from "@/src/api/fetch";
import React, { useEffect } from "react";
import Layout from "@/src/components/Layout";
import { useRouter } from "next/router";
import { generateStaticPathsForSlugs } from "@/src/utils/generateStaticPathsForSlugs";
import { ProductSlugsQuery } from "@/src/queries/ProductSlugsQuery";
import { generateStaticPropsForSlugs } from "@/src/utils/generateStaticPropsForSlugs";
import { useProductSlugs } from "@/src/hooks/useProductSlugsWithLocale";
import { SlugPair, SlugProps } from "@/src/types/Slugs";
import { NECKLACES_ID } from "@/src/utils/constants";
import { Product } from "@/src/types/Product";
import ProductDetail from "@/src/components/product-detail/ProductDetail";

interface ProductWrapperProps {
    parsedContent: Product;
    slugs: SlugPair[];
}

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
            <ProductDetail product={parsedContent} />
        </Layout>
    );
};

export async function getStaticPaths() {
    return generateStaticPathsForSlugs(ProductSlugsQuery(NECKLACES_ID));
}

export async function getStaticProps({ params, locale }: SlugProps) {
    return generateStaticPropsForSlugs(
        () => fetchProductBySlug(params.slug, locale),
        ProductSlugsQuery(NECKLACES_ID),
    );
}

export default ProductWrapper;
