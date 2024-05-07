import React from "react";
import { MAXIMUM_PRODUCT_QUANTITY } from "@/src/utils/constants";
import classnames from "classnames";

interface QuantityChangerProps {
    quantity: number;
    setQuantity: (func: (quantity: number) => number) => void;
}

const handleQuantityChange = (
    setQuantity: (func: (prevQuantity: number) => number) => void,
    increment: boolean,
) => {
    setQuantity((prevQuantity) => {
        if (increment) {
            return prevQuantity + 1 > MAXIMUM_PRODUCT_QUANTITY
                ? MAXIMUM_PRODUCT_QUANTITY
                : prevQuantity + 1;
        }
        return prevQuantity > 1 ? prevQuantity - 1 : 1;
    });
};

const QuantityChanger = ({ quantity, setQuantity }: QuantityChangerProps) => {
    return (
        <>
            <button
                className="product__quantity-button mr-2 has-text-weight-semibold"
                onClick={() => handleQuantityChange(setQuantity, false)}
            >
                -
            </button>
            <input
                className="product__quantity-value"
                type="text"
                value={quantity}
                readOnly
            />
            <button
                className={classnames(
                    "product__quantity-button ml-2 has-text-weight-semibold",
                    {
                        "is-invisible": quantity === MAXIMUM_PRODUCT_QUANTITY,
                    },
                )}
                onClick={() => handleQuantityChange(setQuantity, true)}
            >
                +
            </button>
        </>
    );
};

export default QuantityChanger;
