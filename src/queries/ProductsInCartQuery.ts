export const ProductsInCartQuery = (ids: string[], locale: string) => {
    return `
{
  productCollection(where: {sys: {id_in: ["${ids.join(
      '","',
  )}"]}}, limit: 100, locale: "${locale}") {
    items {
      sys {
        id,
      }
      title,
      price,
      slug,      
    }
  }
}
`;
};
