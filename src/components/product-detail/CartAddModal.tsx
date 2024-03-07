import React from "react";
import Link from "next/link";
import { CART_PATH } from "@/src/utils/constants";
import { useTranslation } from "@/src/contexts/TransContext";

interface CartAddModalProps {
    title: string;
    setIsModalOpen: (value: boolean) => void;
}

const CartAddModal = ({ title, setIsModalOpen }: CartAddModalProps) => {
    const trans = useTranslation();
    return (
        <div className="modal is-active">
            <div
                className="modal-background"
                onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="modal-content has-text-centered">
                <div className="box cart-modal__box">
                    <button
                        className="delete cart-modal__close"
                        onClick={() => setIsModalOpen(false)}
                    ></button>
                    <h1 className="is-size-4 has-text-weight-semibold mb-4">
                        {trans("app.cart.added")}
                    </h1>
                    <p className={"is-size-5 mb-4"}>{title}</p>
                    <Link
                        className="product__add-to-cart"
                        /*onClick={() => setIsModalOpen(false)}*/
                        href={`/${CART_PATH}`}
                    >
                        {trans("app.cart")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartAddModal;
