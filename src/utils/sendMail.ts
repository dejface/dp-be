import { FormData } from "@/src/types/Types";
import { ERROR, SUCCESS } from "@/src/utils/constants";

export const sendMail = async (
    setIsModalOpen: (value: boolean) => void,
    data: FormData,
): Promise<string> => {
    try {
        const response = await fetch("/api/send_mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });
        if (response.ok) {
            setIsModalOpen(true);
            return SUCCESS;
        } else {
            setIsModalOpen(true);
            return ERROR;
        }
    } catch (error) {
        setIsModalOpen(true);
        return ERROR;
    }
};
