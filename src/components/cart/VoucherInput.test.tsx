import { render, screen } from "@testing-library/react";
import VoucherInput from "@/src/components/cart/VoucherInput";
import userEvent from "@testing-library/user-event";

jest.mock("@/contexts/TransContext", () => {
    const { useTransMock } = require("../../../test/helpers/useTransMock");
    return useTransMock({
        "app.cart.voucher": "Voucher",
        "app.cart.delete": "Delete",
        "app.cart.insert": "Insert",
    });
});

let onSubmit: jest.Mock;
let onClear: jest.Mock;
let input: HTMLInputElement;
let button: HTMLElement;

const renderVoucherInput = () => {
    render(
        <VoucherInput
            onSubmit={onSubmit}
            onClear={onClear}
            isModalOpen={false}
        />,
    );
    input = screen.getByPlaceholderText("Voucher") as HTMLInputElement;
    button = screen.getByRole("button");
};

describe("VoucherInput", () => {
    beforeEach(() => {
        onSubmit = jest.fn();
        onClear = jest.fn();
        localStorage.clear();
    });

    describe("functionality", () => {
        it("handles input change", async () => {
            renderVoucherInput();
            await userEvent.type(input, "test");
            expect(input.value).toBe("TEST");
        });

        it("handles voucher submit when voucher is valid and accepted", async () => {
            onSubmit.mockImplementation(
                (_) => (setIsAccepted: (param: boolean) => void) =>
                    setIsAccepted(true),
            );
            renderVoucherInput();

            await userEvent.type(input, "test");
            expect(button).toHaveTextContent("Insert");
            await userEvent.click(button);

            expect(onSubmit).toHaveBeenCalledWith("TEST");
            expect(button.textContent).toBe("Delete");
        });

        it("handles voucher submit when voucher is invalid", async () => {
            onSubmit.mockImplementation(
                (_) => (setIsAccepted: (param: boolean) => void) =>
                    setIsAccepted(false),
            );
            renderVoucherInput();

            await userEvent.type(input, "test");
            await userEvent.click(button);

            expect(onSubmit).toHaveBeenCalledWith("TEST");
            expect(button.textContent).toBe("Insert");
        });

        it("handles voucher clear", async () => {
            onSubmit.mockImplementation(
                (_) => (setIsAccepted: (param: boolean) => void) =>
                    setIsAccepted(true),
            );
            renderVoucherInput();

            await userEvent.type(input, "test");
            expect(button).toHaveTextContent("Insert");
            await userEvent.click(button);
            expect(button.textContent).toBe("Delete");
            await userEvent.click(button);

            expect(button).toHaveTextContent("Insert");
            expect(onClear).toHaveBeenCalled();
            expect(input).toHaveValue("");
        });

        it("handles stored voucher code in local storage", () => {
            localStorage.setItem("voucherCode", "TEST");
            renderVoucherInput();

            expect(input.value).toBe("TEST");
        });

        it("resets voucher code when modal is open", () => {
            localStorage.setItem("voucherCode", "TEST");
            render(
                <VoucherInput
                    onSubmit={onSubmit}
                    onClear={onClear}
                    isModalOpen={true}
                />,
            );
            input = screen.getByPlaceholderText("Voucher") as HTMLInputElement;

            expect(input.value).toBe("");
        });
    });

    describe("correct classnames applied", () => {
        test("input", () => {
            renderVoucherInput();
            expect(input).toHaveClass(
                "input is-radiusless cart__voucher-input",
            );
            expect(input.parentElement).toHaveClass("control is-expanded");
            expect(input.parentElement?.parentElement).toHaveClass(
                "field has-addons",
            );
        });

        test("button insert", () => {
            renderVoucherInput();
            expect(button).toHaveClass(
                "button is-radiusless has-text-weight-semibold is-black",
            );
            expect(button.parentElement).toHaveClass("control");
            expect(button.parentElement?.parentElement).toHaveClass(
                "field has-addons",
            );
            expect(button.firstChild).toHaveClass("cart__voucher-button");
        });

        test("button delete", async () => {
            onSubmit.mockImplementation(
                (_) => (setIsAccepted: (param: boolean) => void) =>
                    setIsAccepted(true),
            );
            renderVoucherInput();

            await userEvent.type(input, "test");
            await userEvent.click(button);

            expect(button).toHaveClass(
                "button is-radiusless has-text-weight-semibold has-background-light-beige",
            );
            expect(button.parentElement).toHaveClass("control");
            expect(button.parentElement?.parentElement).toHaveClass(
                "field has-addons",
            );
            expect(button.firstChild).toHaveClass("cart__voucher-button");
        });
    });
});
