import { SupportedLocale } from "@/src/types/Types";

export const TopProductQuery = (locale: SupportedLocale) => `{
  productCollection (where: {topProduct: true}, locale: "${locale}") {
    items {
      title,
        slug,
      image {
        url,
        description,
        width,
        height
      },
      category {
      sys {
          id
        }
        ... on Category {
          title
        }
      },
    }
  }
}`;
