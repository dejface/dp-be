export const ProductPreviewQuery = (limit: number, skip = 0) => `{
  productCollection(limit: ${limit}, skip: ${skip}) {
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
      slug,
    }
  }
}
`;
