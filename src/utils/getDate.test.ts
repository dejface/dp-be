import moment from "moment";
import { getDate } from "@/src/utils/getDate";

describe("getDate", () => {
    it("formats a valid date string correctly", () => {
        const inputDate = "2023-01-15";
        const expectedResult = "15.01.2023";
        expect(getDate(inputDate)).toBe(expectedResult);
    });

    it("handles leap years correctly", () => {
        const leapYearDate = "2024-02-29";
        const expectedResult = "29.02.2024";
        expect(getDate(leapYearDate)).toBe(expectedResult);
    });

    it("returns an invalid date format for incorrect inputs", () => {
        const invalidDate = "invalid-date-string";
        const expectedResult = moment(invalidDate).format("DD.MM.YYYY"); // Let moment handle the invalid date
        expect(getDate(invalidDate)).toBe(expectedResult);
    });
});
