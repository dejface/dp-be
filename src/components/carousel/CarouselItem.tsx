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

const getButtonOptions = (index: number) => {
    if (index === 1) {
        return null;
    }

    return {
        className: index === 0 ? "left" : "right",
        icon: index === 0 ? faLessThan : faGreaterThan,
    };
}

export const CarouselItem = ({ product, index, slideLeft, slideRight }: CarouselItemProps) => {
    const buttonOptions = getButtonOptions(index);
    return (
        <div className={`column carousel__item is-paddingless is-4 ${index === 0 ? "ml-3" : ""}`}>
            <figure className={`carousel__item image is-3by4 ${index === 2 ? "mr-5" : "mr-3"}`}>
                {buttonOptions &&
                    <button className={`button is-transparent carousel__button-${buttonOptions.className}`}
                            onClick={buttonOptions.className === "left" ? slideLeft : slideRight}>
                        <FontAwesomeIcon className={"fa-icon"} icon={buttonOptions.icon}/>
                    </button>
                }
                <Image src={product.image.url} alt={product.title} width={product.image.width} height={product.image.height}/>
            </figure>
            <p className="has-text-weight-bold has-text-left is-size-7 mt-3">{product.title}</p>
        </div>
    );
}