import React from "react";
import Link from "next/link";
import { CART_PATH } from "@/src/utils/constants";
import { useTranslation } from "@/src/contexts/TransContext";

interface CartAddModalProps {
    title: string;
    wasMaximumQuantityExceeded: boolean;
    setIsModalOpen: (value: boolean) => void;
}

const CartAddModal = ({
    title,
    wasMaximumQuantityExceeded,
    setIsModalOpen,
}: CartAddModalProps) => {
    const trans = useTranslation();
    return (
        <div className="modal is-active">
            <div
                data-testid="modal-background"
                className="modal-background"
                onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="modal-content has-text-centered popup-modal">
                <div className="box cart-modal__box">
                    <button
                        data-testid="cart-modal__close"
                        className="delete cart-modal__close"
                        onClick={() => setIsModalOpen(false)}
                    ></button>
                    <h1 className="is-size-4 is-size-6-mobile has-text-weight-semibold mb-4">
                        {!wasMaximumQuantityExceeded
                            ? trans("app.cart.added")
                            : trans("app.cart.product_quantity_reached_title")}
                    </h1>
                    <p className={"is-size-5 is-size-6-mobile mb-4"}>
                        {!wasMaximumQuantityExceeded
                            ? title
                            : trans("app.cart.product_quantity_reached")}
                    </p>
                    {!wasMaximumQuantityExceeded && (
                        <Link href={`/${CART_PATH}`}>
                            <button className="confirm-button has-one-quarter-width">
                                {trans("app.cart")}
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartAddModal;
