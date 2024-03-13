import React, { useEffect } from "react";
import { CgDanger } from "react-icons/cg";
import { useTranslation } from "@/src/contexts/TransContext";

interface VoucherDeniedModalProps {
    setIsModalOpen: (value: boolean) => void;
}

const VoucherDeniedModal = ({ setIsModalOpen }: VoucherDeniedModalProps) => {
    const trans = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalOpen(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [setIsModalOpen]);

    return (
        <div className="modal is-active left-corner-modal">
            <div className="modal-content has-text-centered">
                <div className="box cart-modal__box has-background-off-white">
                    <CgDanger className="is-size-1 has-text-danger mb-4" />
                    <div className="is-size-4 has-text-weight-semibold mb-4">
                        {trans("app.cart.voucher_denied")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoucherDeniedModal;
