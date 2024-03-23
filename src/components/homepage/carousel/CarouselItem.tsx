import React from "react";
import { PiCaretRightThin, PiCaretLeftThin } from "react-icons/pi";
import { TopProduct } from "@/src/types/Product";
import classNames from "classnames";
import { useLanguage } from "@/src/contexts/TransContext";
import ProductLinkWithImage from "@/src/components/ProductLinkWithImage";

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
        icon: index === 0 ? PiCaretLeftThin : PiCaretRightThin,
    };
};

const CarouselItem = ({
    product,
    index,
    slideLeft,
    slideRight,
}: CarouselItemProps) => {
    const [locale] = useLanguage();
    const buttonOptions = getButtonOptions(index);
    return (
        <div
            className={classNames("column carousel__item is-paddingless is-4", {
                "ml-3": index === 0,
            })}
        >
            <figure
                className={classNames("carousel__item image is-3by4", {
                    "mr-5": index === 2,
                    "mr-3": index !== 2,
                })}
            >
                {buttonOptions && (
                    <button
                        className={`button is-transparent carousel__button-${buttonOptions.className}`}
                        onClick={
                            buttonOptions.className === "left"
                                ? slideLeft
                                : slideRight
                        }
                    >
                        <buttonOptions.icon
                            className={`fa-icon-${buttonOptions.className}`}
                        />
                    </button>
                )}
                <ProductLinkWithImage
                    categoryId={product.category.sys.id}
                    slug={product.slug}
                    image={product.imageGallery[0]}
                    locale={locale}
                />
            </figure>
            <p className="carousel__item__title has-text-left mt-3">
                {product.title}
            </p>
        </div>
    );
};

export default CarouselItem;
