import { SupportedLocale } from "@/src/types/Types";

export const TopProductQuery = (locale: SupportedLocale) => `{
  productCollection (where: {topProduct: true}, locale: "${locale}") {
    items {
      title,
      image {
        url,
        description,
        width,
        height
      }
    }
  }
}`;
