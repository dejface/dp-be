import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useTranslation } from "@/src/contexts/TransContext";
import ShowMore from "@/src/components/ShowMore";
import { PiCaretLeftThin } from "react-icons/pi";
import { PRODUCTS_PATH } from "@/src/utils/constants";

const EmptyCart = () => {
    const trans = useTranslation();
    return (
        <>
            <div className="cart__empty-container has-text-centered">
                <FaShoppingBasket
                    className={"cart__empty-container__basket-icon"}
                    size={"4em"}
                    color={"#B4AAA1"}
                />
                <p className={"cart__empty-container__empty-text"}>
                    {trans("app.cart.empty")}
                </p>
            </div>
            <div className="is-flex is-justify-content-flex-start">
                <ShowMore
                    text={trans("app.cart.browse_products")}
                    href={`/${PRODUCTS_PATH}`}
                    Icon={PiCaretLeftThin}
                    iconPosition={"left"}
                />
            </div>
        </>
    );
};

export default EmptyCart;
