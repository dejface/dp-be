import {
    FREE_SHIPPING_THRESHOLD_CZ,
    FREE_SHIPPING_THRESHOLD_SK,
} from "@/src/utils/constants";
import { SupportedLocale } from "@/src/types/Types";

export const getFreeShippingThreshold = (locale: SupportedLocale) => {
    const freeShippingThresholds = {
        cs: FREE_SHIPPING_THRESHOLD_CZ,
        sk: FREE_SHIPPING_THRESHOLD_SK,
    };

    return freeShippingThresholds[locale];
};
