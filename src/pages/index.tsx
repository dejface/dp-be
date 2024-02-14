import React from "react";
import {
    fetchArticlePreviews,
    fetchHpTopImages,
    fetchInstaPosts,
    fetchReviews,
    fetchTopProducts,
} from "@/src/api/fetch";
import { InstaPost } from "@/src/types/InstaPost";
import { Review } from "@/src/types/Review";
import Layout from "@/src/components/Layout";
import { ARTICLE_PREVIEW_HOMEPAGE_LIMIT } from "@/src/utils/constants";
import { HpTopImage, SupportedLocale } from "@/src/types/Types";
import HpTopImages from "../components/homepage/HpTopImages";
import IconColumns from "@/src/components/homepage/IconColumns";
import Carousel from "@/src/components/homepage/carousel/Carousel";
import InstaGallery from "@/src/components/homepage/InstaGallery";
import WaterproofSection from "@/src/components/homepage/WaterproofSection";
import ReviewsSection from "@/src/components/homepage/review/ReviewsSection";
import BlogSection from "@/src/components/homepage/blog/BlogSection";
import About from "@/src/components/homepage/About";
import { TopProduct } from "@/src/types/Product";
import { ArticlePreview } from "@/src/types/Article";

interface HomeProps {
    topProducts: TopProduct[] | null;
    hpTopImages: [HpTopImage, HpTopImage] | null;
    instaPosts: InstaPost[] | null;
    reviews: Review[] | null;
    articlePreviews: ArticlePreview[] | null;
}

interface StaticProps {
    locale: SupportedLocale;
}

export async function getStaticProps({ locale }: StaticProps) {
    const topProducts = await fetchTopProducts(locale);
    const hpTopImages = await fetchHpTopImages();
    const instaPosts = await fetchInstaPosts(locale);
    const reviews = await fetchReviews(locale);
    const articlePreviews = await fetchArticlePreviews(
        ARTICLE_PREVIEW_HOMEPAGE_LIMIT,
        locale,
    );

    return {
        props: {
            topProducts,
            hpTopImages,
            instaPosts,
            reviews,
            articlePreviews: articlePreviews?.data,
        },
    };
}

const HomepageIndex = ({
    topProducts,
    hpTopImages,
    instaPosts,
    reviews,
    articlePreviews,
}: HomeProps) => {
    return (
        <>
            <Layout>
                {hpTopImages && (
                    <HpTopImages
                        leftImage={hpTopImages[0]}
                        rightImage={hpTopImages[1]}
                    />
                )}
                <IconColumns />
                {topProducts && <Carousel products={topProducts} />}
                {instaPosts && <InstaGallery instaPosts={instaPosts} />}
                <WaterproofSection />
                {reviews && <ReviewsSection reviews={reviews} />}
                {articlePreviews && <BlogSection previews={articlePreviews} />}
                <About />
            </Layout>
        </>
    );
};

export default HomepageIndex;
