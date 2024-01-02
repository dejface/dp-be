import React, { useState, useMemo, useCallback } from 'react';
import {TopProduct} from "@/src/types/TopProduct";
import {useTranslation} from "@/src/hooks/useTranslation";
import {CarouselItem} from "@/src/components/carousel/CarouselItem";

interface CarouselProps {
    products: TopProduct[];
}

const Carousel = ({ products }: CarouselProps) => {
    const trans = useTranslation();
    const [startIndex, setStartIndex] = useState(0);

    const slideLeft = useCallback(() => {
        setStartIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : products.length - 1);
    }, [products]);

    const slideRight = useCallback(() => {
        setStartIndex(prevIndex => (prevIndex + 1) % products.length);
    }, [products]);

    const displayedProducts = useMemo(() => {
        let productsToShow = products.slice(startIndex, startIndex + 3);
        while (productsToShow.length < 3) {
            productsToShow = [...productsToShow, ...products.slice(0, 3 - productsToShow.length)];
        }
        return productsToShow;
    }, [products, startIndex]);

    return (
        <section className="section ml-3 is-paddingless">
            <h1 className="title top-product-title">{trans('app.top_products.title')}</h1>
            <div className="tile is-ancestor">
                {displayedProducts.map((product, index) => (
                    <CarouselItem key={index} product={product} index={index} slideLeft={slideLeft} slideRight={slideRight} />
                ))}
            </div>
        </section>
    );
};

export default Carousel;