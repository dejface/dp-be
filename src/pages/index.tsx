import HpTopImages from "@/src/components/HpTopImages";
import IconColumns from "@/src/components/IconColumns";
import Carousel from "@/src/components/carousel/Carousel";
import InstaGallery from "@/src/components/InstaGallery";
import WaterproofSection from "@/src/components/WaterproofSection";
import About from "@/src/components/About";
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
import ReviewsSection from "@/src/components/review/ReviewsSection";
import BlogSection from "@/src/components/blog/BlogSection";
import Layout from "@/src/components/Layout";
import { ARTICLE_PREVIEW_HOMEPAGE_LIMIT } from "@/src/utils/constants";

interface HomeProps {
    parsedTopProducts: TopProduct[] | null;
    parsedHpTopImages: [HpTopImage, HpTopImage] | null;
    parsedInstaPosts: InstaPost[] | null;
    parsedReviews: Review[] | null;
    parsedArticlePreviews: ArticlePreview[] | null;
}

export async function getStaticProps() {
    let parsedTopProducts = null,
        parsedHpTopImages = null,
        parsedInstaPosts = null,
        parsedReviews = null,
        parsedArticlePreviews = null;
    const topProducts = await fetchTopProducts();
    const hpTopImages = await fetchHpTopImages();
    const instaPosts = await fetchInstaPosts();
    const reviews = await fetchReviews();
    const articlePreviews = await fetchArticlePreviews(
        ARTICLE_PREVIEW_HOMEPAGE_LIMIT,
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

const Index = ({
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

export default Index;
