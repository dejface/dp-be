import { getPhonePattern } from "@/src/utils/getPhonePattern";

describe("getPhonePattern", () => {
    it("returns the correct phone pattern for 'cs' locale", () => {
        const pattern = getPhonePattern("cs");
        expect(pattern).toEqual(new RegExp("^\\+420\\d{9}$"));
    });

    it("returns the correct phone pattern for 'sk' locale", () => {
        const pattern = getPhonePattern("sk");
        expect(pattern).toEqual(new RegExp("^\\+421\\d{9}$"));
    });
});
