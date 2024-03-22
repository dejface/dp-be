import { SupportedLocale } from "@/src/types/Types";

export const ShippingOptionsQuery = (locale: SupportedLocale) => `{
  shippingCollection(locale: "${locale}", order: sys_id_DESC) {
    items{
      sys {
        id
      },
      type,
      price
    }
  }
}`;
