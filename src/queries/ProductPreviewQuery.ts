import { SupportedLocale } from "@/src/types/Types";

export const ProductPreviewQuery = (
    limit: number,
    locale: SupportedLocale,
    skip = 0,
) => `{
  productCollection(limit: ${limit}, locale: "${locale}", skip: ${skip}, order: sys_publishedAt_DESC) {
    total,
    items {
      image {
        description,
        url,
        width,
        height
      },
      title,
      shortDescription,
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
