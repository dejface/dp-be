import { sendMail } from "@/src/utils/sendMail";
import { ERROR, SUCCESS } from "@/src/utils/constants";

describe("sendMail", () => {
    let setIsModalOpen: jest.Mock;
    let setEmailStatus: jest.Mock;

    beforeEach(() => {
        setIsModalOpen = jest.fn();
        setEmailStatus = jest.fn();
        global.fetch = jest.fn();
    });

    it("should call setEmailStatus with SUCCESS when fetch is successful", async () => {
        (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
        await sendMail(setIsModalOpen, setEmailStatus, {
            name: "test",
            email: "test@test.com",
            message: "test",
        });
        expect(setEmailStatus).toHaveBeenCalledWith(SUCCESS);
        expect(setIsModalOpen).toHaveBeenCalledWith(true);
    });

    it("should call setEmailStatus with ERROR when fetch is not successful", async () => {
        (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
        await sendMail(setIsModalOpen, setEmailStatus, {
            name: "test",
            email: "test@test.com",
            message: "test",
        });
        expect(setEmailStatus).toHaveBeenCalledWith(ERROR);
        expect(setIsModalOpen).toHaveBeenCalledWith(true);
    });

    it("should call setEmailStatus with ERROR when fetch throws an error", async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error());
        await sendMail(setIsModalOpen, setEmailStatus, {
            name: "test",
            email: "test@test.com",
            message: "test",
        });
        expect(setEmailStatus).toHaveBeenCalledWith(ERROR);
        expect(setIsModalOpen).toHaveBeenCalledWith(true);
    });
});
