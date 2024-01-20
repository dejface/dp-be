/*
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import HpTopImages from "@/src/components/HpTopImages";
import IconColumns from "@/src/components/IconColumns";
import Carousel from "@/src/components/carousel/Carousel";
import useFetchHpTopImages from "@/src/hooks/useFetchHpTopImages";
import ImageAndDescription from "@/src/components/ImageAndDescription";
import ShippingNotice from "@/src/components/ShippingNotice";
import {useTranslation} from "@/src/hooks/useTranslation";
import LanguageSwitch from "@/src/components/LanguageSwitch";
import Navbar from "@/src/components/Navbar";
import InstaGallery from "@/src/components/InstaGallery";
import ReviewsSection from "@/src/components/ReviewsSection";
import BlogSection from "@/src/components/BlogSection";
import About from "@/src/components/About";
import Footer from "@/src/components/Footer";
import {fetchTopProducts} from "@/src/api/fetch";
import {TopProductsParser} from "@/src/parsers/TopProductsParser";
import {TopProduct} from "@/src/types/TopProduct";

interface LayoutProps {
    children: React.ReactNode;
}

export async function getStaticProps() {
    let parsedTopProducts = null;
    const topProducts = await fetchTopProducts();
    if (topProducts) {
        parsedTopProducts = TopProductsParser(topProducts);
    }

    return {
        props: {
            parsedTopProducts
        },
    }
}

const Layout = ({ children }: LayoutProps) => {
    const { hpTopLeft, hpTopRight, error: errorImages } = useFetchHpTopImages();
    const trans = useTranslation();

    // TODO: Here should be skeleton instead of error
    /!*if (errorImages || !hpTopLeft || !hpTopRight || errorProducts) {
        return <div>Error: {errorImages || errorProducts}</div>;
    }*!/

    return (
        <>
            <ShippingNotice notice={trans('app.shipping_notice')}/>
            <div className="columns is-gapless is-centered has-background-white">
                <div className="column is-8 is-offset-2">
                    <LanguageSwitch/>
                    <Navbar/>
                    {hpTopLeft && hpTopRight && <HpTopImages leftImage={hpTopLeft} rightImage={hpTopRight}/>}
                    <IconColumns/>
                    {parsedTopProducts && <Carousel products={parsedTopProducts}/>}
                    <InstaGallery/>
                    <ImageAndDescription/>
                    <ReviewsSection/>
                    <BlogSection/>
                    <About/>
                    <Footer/>
                </div>
                <Analytics/>
            </div>
        </>
    );
};

export default Layout;*/
