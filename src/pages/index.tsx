import React from "react";
import {
    fetchArticlePreviews,
    fetchHpTopImages,
    fetchInstaPosts,
    fetchReviews,
    fetchTopProducts,
} from "@/src/api/fetch";
import { TopProductsParser } from "@/src/parsers/TopProductsParser";
import { TopProduct } from "@/src/types/TopProduct";
import { HpTopImageParser } from "@/src/parsers/HpTopImageParser";
import { HpTopImage } from "@/src/types/HpTopImage";
import { InstaPostsParser } from "@/src/parsers/InstaPostsParser";
import { InstaPost } from "@/src/types/InstaPost";
import { ReviewParser } from "@/src/parsers/ReviewParser";
import { Review } from "@/src/types/Review";
import { ArticlePreviewParser } from "@/src/parsers/ArticlePreviewParser";
import { ArticlePreview } from "@/src/types/ArticlePreview";
import Layout from "@/src/components/Layout";
import { ARTICLE_PREVIEW_HOMEPAGE_LIMIT } from "@/src/utils/constants";
import { SupportedLocale } from "@/src/types/Types";
import HpTopImages from "../components/homepage/HpTopImages";
import IconColumns from "@/src/components/homepage/IconColumns";
import Carousel from "@/src/components/homepage/carousel/Carousel";
import InstaGallery from "@/src/components/homepage/InstaGallery";
import WaterproofSection from "@/src/components/homepage/WaterproofSection";
import ReviewsSection from "@/src/components/homepage/review/ReviewsSection";
import BlogSection from "@/src/components/homepage/blog/BlogSection";
import About from "@/src/components/homepage/About";

interface HomeProps {
    parsedTopProducts: TopProduct[] | null;
    parsedHpTopImages: [HpTopImage, HpTopImage] | null;
    parsedInstaPosts: InstaPost[] | null;
    parsedReviews: Review[] | null;
    parsedArticlePreviews: ArticlePreview[] | null;
}

interface StaticProps {
    locale: SupportedLocale;
}

export async function getStaticProps({ locale }: StaticProps) {
    let parsedTopProducts = null,
        parsedHpTopImages = null,
        parsedInstaPosts = null,
        parsedReviews = null,
        parsedArticlePreviews = null;
    const topProducts = await fetchTopProducts(locale);
    const hpTopImages = await fetchHpTopImages();
    const instaPosts = await fetchInstaPosts(locale);
    const reviews = await fetchReviews(locale);
    const articlePreviews = await fetchArticlePreviews(
        ARTICLE_PREVIEW_HOMEPAGE_LIMIT,
        locale,
    );
    if (topProducts) {
        parsedTopProducts = TopProductsParser(topProducts);
    }
    if (hpTopImages) {
        parsedHpTopImages = HpTopImageParser(hpTopImages);
    }
    if (instaPosts) {
        parsedInstaPosts = InstaPostsParser(instaPosts);
    }
    if (reviews) {
        parsedReviews = ReviewParser(reviews);
    }
    if (articlePreviews) {
        parsedArticlePreviews = ArticlePreviewParser(articlePreviews, true);
    }

    return {
        props: {
            parsedTopProducts,
            parsedHpTopImages,
            parsedInstaPosts,
            parsedReviews,
            parsedArticlePreviews,
        },
    };
}

const HomepageIndex = ({
    parsedTopProducts,
    parsedHpTopImages,
    parsedInstaPosts,
    parsedReviews,
    parsedArticlePreviews,
}: HomeProps) => {
    return (
        <>
            <Layout>
                {parsedHpTopImages && (
                    <HpTopImages
                        leftImage={parsedHpTopImages[0]}
                        rightImage={parsedHpTopImages[1]}
                    />
                )}
                <IconColumns />
                {parsedTopProducts && <Carousel products={parsedTopProducts} />}
                {parsedInstaPosts && (
                    <InstaGallery instaPosts={parsedInstaPosts} />
                )}
                <WaterproofSection />
                {parsedReviews && <ReviewsSection reviews={parsedReviews} />}
                {parsedArticlePreviews && (
                    <BlogSection previews={parsedArticlePreviews} />
                )}
                <About />
            </Layout>
        </>
    );
};

export default HomepageIndex;
