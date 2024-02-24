import { SupportedLocale } from "@/src/types/Types";

export const ProductPreviewQuery = (
    limit: number,
    locale: SupportedLocale,
    skip = 0,
    category?: string,
) => {
    let where = "";
    if (category) {
        `where: {category: {sys: {id: "${category}"}}}`;
    }

    return `{
  productCollection(limit: ${limit}, locale: "${locale}", skip: ${skip}, order: sys_publishedAt_DESC, ${where}) {
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
};
