import { ProductWrapperHOC } from "@/src/components/ProductWrapperHOC";
import { BRACELETS_ID } from "@/src/utils/constants";
import { ProductSlugsQuery } from "@/src/queries/ProductSlugsQuery";
import { generateStaticPathsForSlugs } from "@/src/utils/generateStaticPathsForSlugs";
import { SlugProps } from "@/src/types/Slugs";
import { fetchProductBySlug } from "@/src/api/fetch";
import { generateStaticPropsForSlugs } from "@/src/utils/generateStaticPropsForSlugs";

const ProductWrapper = ProductWrapperHOC();

export default ProductWrapper;

export async function getStaticPaths() {
    return generateStaticPathsForSlugs(ProductSlugsQuery(BRACELETS_ID));
}

export async function getStaticProps({ params, locale }: SlugProps) {
    return generateStaticPropsForSlugs(
        () => fetchProductBySlug(params.slug, locale),
        ProductSlugsQuery(BRACELETS_ID),
    );
}
