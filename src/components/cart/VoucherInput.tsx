import React, { useEffect, useState } from "react";
import { useTranslation } from "@/src/contexts/TransContext";
import classNames from "classnames";

interface VoucherInputProps {
    onSubmit: (
        voucherCode: string,
    ) => (setIsAccepted: React.Dispatch<React.SetStateAction<boolean>>) => void;
    onClear: () => void;
    isModalOpen: boolean;
}

const VoucherInput = ({
    onSubmit,
    onClear,
    isModalOpen,
}: VoucherInputProps) => {
    const trans = useTranslation();
    const [voucherCode, setVoucherCode] = useState("");
    const [isAccepted, setIsAccepted] = useState(false);

    useEffect(() => {
        const storedVoucherCode = localStorage.getItem("voucherCode");
        if (storedVoucherCode) {
            setVoucherCode(storedVoucherCode);
            setIsAccepted(true);
        }
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            setVoucherCode("");
        }
    }, [isModalOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherCode(e.target.value.toUpperCase());
    };

    const handleVoucherSubmit = () => {
        localStorage.setItem("voucherCode", voucherCode);
        onSubmit(voucherCode)(setIsAccepted);
    };

    const handleClearVoucher = () => {
        localStorage.removeItem("voucherCode");
        onClear();
        setVoucherCode("");
        setIsAccepted(false);
    };

    return (
        <div className="field has-addons">
            <div className="control is-expanded">
                <input
                    className="input is-radiusless cart__voucher-input"
                    type="text"
                    placeholder={trans("app.cart.voucher")}
                    value={voucherCode}
                    onChange={handleInputChange}
                    disabled={isAccepted}
                />
            </div>
            <div className="control">
                <button
                    className={classNames(
                        "button is-radiusless has-text-weight-semibold",
                        {
                            "has-background-light-beige": isAccepted,
                            "is-black": !isAccepted,
                        },
                    )}
                    onClick={
                        isAccepted ? handleClearVoucher : handleVoucherSubmit
                    }
                >
                    <span className={"cart__voucher-button"}>
                        {isAccepted
                            ? trans("app.cart.delete")
                            : trans("app.cart.insert")}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default VoucherInput;
