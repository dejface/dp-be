import { SupportedLocale } from "@/src/types/Types";

export const ProductBySlugQuery = (slug: string, locale: SupportedLocale) => `{
  productCollection(where: {slug: "${slug}"}, limit: 1, locale: "${locale}") {
    items {
      image {
        description,
        url,
        width,
        height
      },
      title,
      shortDescription,
      description
      price,
      topProduct,
      category {
      sys {
          id
        }
        ... on Category {
          title
        }
      },
      lastPiecesText,
      newArrival,
      bestSeller,
      slug,
    }
  }
}
`;
