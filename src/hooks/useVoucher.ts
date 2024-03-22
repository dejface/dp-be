import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Voucher } from "@/src/types/Types";

interface UseVoucherReturn {
    handleVoucherSubmit: (
        voucherCode: string,
    ) => (setIsAccepted: Dispatch<SetStateAction<boolean>>) => void;
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const useVoucher = (
    voucherCodes: Voucher[],
    setVoucher: (voucher: Voucher) => void,
): UseVoucherReturn => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleVoucherSubmit =
        (voucherCode: string) =>
        (setIsAccepted: Dispatch<SetStateAction<boolean>>): void => {
            const voucher = voucherCodes.find((v) => v.name === voucherCode);
            if (voucher) {
                setVoucher(voucher);
                setIsModalOpen(false);
                setIsAccepted(true);
                localStorage.setItem("voucherCode", voucherCode);
            } else {
                setIsModalOpen(true);
                setIsAccepted(false);
            }
        };

    return { handleVoucherSubmit, isModalOpen, setIsModalOpen };
};
