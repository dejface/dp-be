import { SupportedLocale } from "@/src/types/Types";

const getCurrencies = (locale: SupportedLocale) => {
    const currencyMap: { [key in SupportedLocale]: string } = {
        cs: "CZK",
        sk: "EUR",
    };
    return currencyMap[locale];
};

export const getFormattedPrice = (price: number, locale: SupportedLocale) => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: getCurrencies(locale),
    }).format(price);
};
