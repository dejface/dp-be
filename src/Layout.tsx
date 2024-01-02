import React, { useEffect, useState } from 'react';
import Header from '@/src/components/Header';
import { Analytics } from '@vercel/analytics/react';
import HpTopImages from "@/src/components/HpTopImages";
import IconColumns from "@/src/components/IconColumns";
import Carousel from "@/src/components/carousel/Carousel";
import {fetchHpTopImages, fetchTopProducts} from "@/src/api/fetch";
import {HpTopImageParser} from "@/src/parsers/HpTopImageParser";
import {HpTopImage} from "@/src/types/HpTopImage";
import {TopProduct} from "@/src/types/TopProduct";
import {TopProductsParser} from "@/src/parsers/TopProductsParser";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [hpTopLeft, setHpTopLeft] = useState<HpTopImage | null>(null);
    const [hpTopRight, setHpTopRight] = useState<HpTopImage | null>(null);
    const [topProducts, setTopProducts] = useState<TopProduct[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const topImages = await fetchHpTopImages();
            const topProducts = await fetchTopProducts();
            if (topImages) {
                const parsedData = HpTopImageParser(topImages);
                if (parsedData) {
                    const [leftImage, rightImage] = parsedData;
                    setHpTopLeft(leftImage);
                    setHpTopRight(rightImage);
                } else {
                    setError('Error parsing images');
                }
            } else {
                setError('Error fetching images');
            }
            if (topProducts) {
                const parsedData = TopProductsParser(topProducts);
                setTopProducts(parsedData);
            } else {
                setError('Error fetching products');
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    if (error || !hpTopLeft || !hpTopRight) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="columns is-gapless is-centered has-background-white">
            <div className="column is-8 is-offset-2">
                <Header />
                <HpTopImages leftImage={hpTopLeft} rightImage={hpTopRight} />
                <IconColumns />
                {topProducts && <Carousel products={topProducts}/>}
            </div>
            <Analytics/>
        </div>
    );
};

export default Layout;