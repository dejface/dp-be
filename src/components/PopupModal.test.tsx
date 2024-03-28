import { render, act, screen } from "@testing-library/react";
import PopupModal from "@/src/components/PopupModal";
import { CgDanger } from "react-icons/cg";

describe("PopupModal", () => {
    describe("functionality", () => {
        it("closes modal after 2000ms", async () => {
            const setIsModalOpen = jest.fn();
            jest.useFakeTimers();

            render(
                <PopupModal
                    setIsModalOpen={setIsModalOpen}
                    text={"Voucher denied"}
                    Icon={CgDanger}
                    iconColor={"has-text-danger"}
                />,
            );

            expect(setIsModalOpen).not.toHaveBeenCalled();

            act(() => {
                jest.advanceTimersByTime(2000);
            });

            expect(setIsModalOpen).toHaveBeenCalledWith(false);

            jest.useRealTimers();
        });
    });

    describe("correct classnames", () => {
        test("icon", () => {
            render(
                <PopupModal
                    setIsModalOpen={jest.fn()}
                    Icon={CgDanger}
                    iconColor={"has-text-danger"}
                    text={"Voucher denied"}
                />,
            );
            const icon = screen.getByTestId("popup-modal-icon");
            expect(icon).toHaveClass("is-size-1 has-text-danger mb-4");
            expect(icon.parentElement).toHaveClass(
                "box cart-modal__box has-background-light-beige",
            );
            expect(icon.parentElement?.parentElement).toHaveClass(
                "modal-content has-text-centered",
            );
            expect(
                icon.parentElement?.parentElement?.parentElement,
            ).toHaveClass("modal is-active popup-modal");
        });

        test("text", () => {
            render(
                <PopupModal
                    setIsModalOpen={jest.fn()}
                    Icon={CgDanger}
                    iconColor={"has-text-danger"}
                    text={"Voucher denied"}
                />,
            );
            const text = screen.getByText("Voucher denied");
            expect(text).toHaveClass(
                "is-size-4-desktop has-text-weight-semibold mb-4",
            );
            expect(text.parentElement).toHaveClass(
                "box cart-modal__box has-background-light-beige",
            );
            expect(text.parentElement?.parentElement).toHaveClass(
                "modal-content has-text-centered",
            );
            expect(
                text.parentElement?.parentElement?.parentElement,
            ).toHaveClass("modal is-active popup-modal");
        });
    });
});
