import React from "react";

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
            return prevQuantity + 1;
        }
        return prevQuantity > 1 ? prevQuantity - 1 : 1;
    });
};

const QuantityChanger = ({ quantity, setQuantity }: QuantityChangerProps) => {
    return (
        <span className="quantity-changer is-flex">
            <p className="control">
                <button
                    className="product__quantity-button mr-2 has-text-weight-semibold"
                    onClick={() => handleQuantityChange(setQuantity, false)}
                >
                    -
                </button>
            </p>
            <p className="control">
                <input
                    className="product__quantity-value"
                    type="text"
                    value={quantity}
                    readOnly
                />
            </p>
            <p className="control mr-6 ml-2">
                <button
                    className="product__quantity-button has-text-weight-semibold"
                    onClick={() => handleQuantityChange(setQuantity, true)}
                >
                    +
                </button>
            </p>
        </span>
    );
};

export default QuantityChanger;
