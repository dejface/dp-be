import { sendMail } from "@/src/utils/sendMail";
import { ERROR, SUCCESS } from "@/src/utils/constants";

describe("sendMail", () => {
    let setIsModalOpen: jest.Mock;

    beforeEach(() => {
        setIsModalOpen = jest.fn();
        global.fetch = jest.fn();
    });

    it("should call setEmailStatus with SUCCESS when fetch is successful", async () => {
        (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
        const status = await sendMail(setIsModalOpen, {
            name: "test",
            email: "test@test.com",
            message: "test",
        });
        expect(status).toEqual(SUCCESS);
        expect(setIsModalOpen).toHaveBeenCalledWith(true);
    });

    it("should call setEmailStatus with ERROR when fetch is not successful", async () => {
        (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
        const status = await sendMail(setIsModalOpen, {
            name: "test",
            email: "test@test.com",
            message: "test",
        });
        expect(status).toEqual(ERROR);
        expect(setIsModalOpen).toHaveBeenCalledWith(true);
    });

    it("should call setEmailStatus with ERROR when fetch throws an error", async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error());
        const status = await sendMail(setIsModalOpen, {
            name: "test",
            email: "test@test.com",
            message: "test",
        });
        expect(status).toEqual(ERROR);
        expect(setIsModalOpen).toHaveBeenCalledWith(true);
    });
});
