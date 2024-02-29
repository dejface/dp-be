import React from "react";
import Image from "next/image";
import { PiCaretRightThin, PiCaretLeftThin } from "react-icons/pi";
import Link from "next/link";
import { useLanguage } from "@/src/hooks/useTranslation";
import { PRODUCT_PATH, PRODUCTS_PATH } from "@/src/utils/constants";
import { TopProduct } from "@/src/types/Product";
import classNames from "classnames";

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
                <Link
                    href={`/${PRODUCTS_PATH}/${PRODUCT_PATH}/${product.slug}`}
                    locale={locale}
                >
                    <Image
                        src={product.image.url}
                        alt={product.title}
                        width={product.image.width}
                        height={product.image.height}
                    />
                </Link>
            </figure>
            <p className="has-text-weight-bold has-text-left is-size-7 mt-3">
                {product.title}
            </p>
        </div>
    );
};

export default CarouselItem;
