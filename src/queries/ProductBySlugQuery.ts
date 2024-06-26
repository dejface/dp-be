import { SupportedLocale } from "@/src/types/Types";

export const ProductBySlugQuery = (slug: string, locale: SupportedLocale) => `{
  productCollection(where: {slug: "${slug}"}, limit: 1, locale: "${locale}") {
    items {
      imageGalleryCollection {
        items {
          description,
          url,
          width,
          height
        }
      },
      sys {
        id,
      }
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
