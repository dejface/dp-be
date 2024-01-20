export const TopProductQuery = `{
  productCollection (where: {topProduct: true}) {
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
