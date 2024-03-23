import { SupportedLocale } from "@/src/types/Types";

export const getFreeShippingThreshold = (locale: SupportedLocale) => {
    const freeShippingThresholds = {
        cs: Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_CZ),
        sk: Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_SK),
    };

    return freeShippingThresholds[locale];
};
