import {TopProduct} from "@/src/types/TopProduct";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGreaterThan, faLessThan} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface CarouselItemProps {
    product: TopProduct;
    index: number;
    slideLeft: () => void;
    slideRight: () => void;
}

export const CarouselItem = ({ product, index, slideLeft, slideRight }: CarouselItemProps) => (
    <div className="tile is-parent is-paddingless mr-3">
        {index === 0 &&
            <button className="button is-transparent carousel-button-left" onClick={slideLeft}>
                <FontAwesomeIcon icon={faLessThan}/>
            </button>
        }
        <article className="tile is-child box is-shadowless is-paddingless">
            <figure className="image is-3by4">
                <Image src={product.image.url} alt={product.title} width={product.image.width} height={product.image.height}/>
            </figure>
            <p className="has-text-weight-bold has-text-left is-size-7 mt-3">{product.title}</p>
        </article>
        {index === 2 &&
            <button className="button is-transparent carousel-button-right" onClick={slideRight}>
                <FontAwesomeIcon icon={faGreaterThan}/>
            </button>
        }
    </div>
);