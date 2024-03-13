import { Dispatch, SetStateAction, useState } from "react";
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
    setDiscount: Dispatch<SetStateAction<number>>,
): UseVoucherReturn => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleVoucherSubmit =
        (voucherCode: string) =>
        (setIsAccepted: Dispatch<SetStateAction<boolean>>): void => {
            const voucher = voucherCodes.find((v) => v.name === voucherCode);
            if (voucher) {
                setDiscount(voucher.value);
                setIsModalOpen(false);
                setIsAccepted(true);
            } else {
                setIsModalOpen(true);
                setIsAccepted(false);
            }
        };

    return { handleVoucherSubmit, isModalOpen, setIsModalOpen };
};
