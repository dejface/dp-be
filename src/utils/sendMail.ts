import { FormData } from "@/src/types/Types";
import { ERROR, SUCCESS } from "@/src/utils/constants";

export const sendMail = async (
    setIsModalOpen: (value: boolean) => void,
    setEmailStatus: (value: string) => void,
    data: FormData,
) => {
    try {
        const response = await fetch("/api/send_mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });
        if (response.ok) {
            setEmailStatus(SUCCESS);
        } else {
            setEmailStatus(ERROR);
        }
    } catch (error) {
        setEmailStatus(ERROR);
    }
    setIsModalOpen(true);
};
