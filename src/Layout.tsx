import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import HpTopImages from "@/src/components/HpTopImages";
import IconColumns from "@/src/components/IconColumns";
import Carousel from "@/src/components/carousel/Carousel";
import useFetchHpTopImages from "@/src/hooks/useFetchHpTopImages";
import useFetchTopProducts from "@/src/hooks/useFetchTopProducts";
import ImageAndDescription from "@/src/components/ImageAndDescription";
import ShippingNotice from "@/src/components/ShippingNotice";
import {useTranslation} from "@/src/hooks/useTranslation";
import LanguageSwitch from "@/src/components/LanguageSwitch";
import Navbar from "@/src/components/Navbar";
import InstaGallery from "@/src/components/InstaGallery";
import ReviewsSection from "@/src/components/ReviewsSection";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { hpTopLeft, hpTopRight, error: errorImages } = useFetchHpTopImages();
    const { topProducts, error: errorProducts } = useFetchTopProducts();
    const trans = useTranslation();

    // TODO: Here should be skeleton instead of error
    /*if (errorImages || !hpTopLeft || !hpTopRight || errorProducts) {
        return <div>Error: {errorImages || errorProducts}</div>;
    }*/

    return (
        <>
            <ShippingNotice notice={trans('app.shipping_notice')}/>
            <div className="columns is-gapless is-centered has-background-white">
                <div className="column is-8 is-offset-2">
                    <LanguageSwitch/>
                    <Navbar/>
                    {hpTopLeft && hpTopRight && <HpTopImages leftImage={hpTopLeft} rightImage={hpTopRight}/>}
                    <IconColumns/>
                    {topProducts && <Carousel products={topProducts}/>}
                    <InstaGallery/>
                    <ImageAndDescription/>
                    <ReviewsSection/>
                </div>
                <Analytics/>
            </div>
        </>
    );
};

export default Layout;