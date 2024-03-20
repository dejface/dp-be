import { SupportedLocale } from "@/src/types/Types";

export const getPhonePattern = (locale: SupportedLocale) => {
    const phonePatternMap: { [key in SupportedLocale]: string } = {
        cs: "^\\+420\\d{9}$",
        sk: "^\\+421\\d{9}$",
    };
    return new RegExp(phonePatternMap[locale]);
};
