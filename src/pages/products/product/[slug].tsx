import { fetchProductBySlug } from "@/src/api/fetch";
import { ArticleContent } from "@/src/types/Article";
import React, { useEffect } from "react";
import Layout from "@/src/components/Layout";
import { useRouter } from "next/router";
import { SlugPair, SlugProps } from "@/src/types/Types";
import { generateStaticPathsForSlugs } from "@/src/utils/generateStaticPathsForSlugs";
import { ProductSlugsQuery } from "@/src/queries/ProductSlugsQuery";
import { generateStaticPropsForSlugs } from "@/src/utils/generateStaticPropsForSlugs";
import { useProductSlugs } from "@/src/hooks/useProductSlugsWithLocale";

interface ArticleWrapperProps {
    parsedContent: ArticleContent;
    slugs: SlugPair[];
}

const ArticleWrapper = ({ parsedContent, slugs }: ArticleWrapperProps) => {
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
            <div>Hi</div>
        </Layout>
    );
};

export async function getStaticPaths() {
    return generateStaticPathsForSlugs(ProductSlugsQuery);
}

export async function getStaticProps({ params, locale }: SlugProps) {
    return generateStaticPropsForSlugs(
        () => fetchProductBySlug(params.slug, locale),
        ProductSlugsQuery,
    );
}

export default ArticleWrapper;
