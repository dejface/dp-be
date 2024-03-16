import { SupportedLocale } from "@/src/types/Types";

const TAX_RATES = {
    cs: 1.21,
    sk: 1.21,
};

export const getCalculatedTax = (price: number, locale: SupportedLocale) => {
    return price / TAX_RATES[locale];
};
