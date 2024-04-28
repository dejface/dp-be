import { getShippingPrice } from "@/src/utils/getShippingPrice";
import { ShippingOption } from "@/src/types/Types";

const shippingOptions: ShippingOption[] = [
    { sys: { id: "1" }, price: 10, type: "Standard" },
    { sys: { id: "2" }, price: 20, type: "Express" },
];

describe("getShippingPrice", () => {
    it("returns 0 when hasFreeShipping is true", () => {
        const price = getShippingPrice(shippingOptions, null, true);
        expect(price).toBe(0);
    });

    it("returns null when no shipping option is selected", () => {
        const price = getShippingPrice(shippingOptions, null, false);
        expect(price).toBeNull();
    });

    it("returns the price of the selected shipping option", () => {
        const selectedOption = shippingOptions[0];
        const price = getShippingPrice(shippingOptions, selectedOption, false);
        expect(price).toBe(10);
    });
});
