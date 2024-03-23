import React, { useState, useMemo, useCallback } from "react";
import CarouselItem from "@/src/components/homepage/carousel/CarouselItem";
import { TopProduct } from "@/src/types/Product";
import { useTranslation } from "@/src/contexts/TransContext";

interface CarouselProps {
    products: TopProduct[];
}

const Carousel = ({ products }: CarouselProps) => {
    const trans = useTranslation();
    const [startIndex, setStartIndex] = useState(0);

    const slideLeft = useCallback(() => {
        setStartIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, [products]);

    const slideRight = useCallback(() => {
        setStartIndex(
            (prevIndex) => (prevIndex - 1 + products.length) % products.length,
        );
    }, [products]);

    const displayedProducts = useMemo(() => {
        let productsToShow = products.slice(startIndex, startIndex + 3);
        while (productsToShow.length < 3) {
            productsToShow = [
                ...productsToShow,
                ...products.slice(0, 3 - productsToShow.length),
            ];
        }
        return productsToShow;
    }, [products, startIndex]);

    return (
        <section className="section pb-6 is-paddingless px-1-mobile">
            <h1 className="carousel__title ml-0 pb-5">
                {trans("app.top_products.title")}
            </h1>
            <div className="columns is-mobile">
                {displayedProducts.map((product, index) => (
                    <CarouselItem
                        key={index}
                        product={product}
                        index={index}
                        slideLeft={slideLeft}
                        slideRight={slideRight}
                    />
                ))}
            </div>
        </section>
    );
};

export default Carousel;
