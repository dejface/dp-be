export const ProductByCategoryTotalQuery = (id: string) => `{
    categoryCollection (where: {sys: {id: "${id}"}}){
      items {
        linkedFrom {
          entryCollection {
            total
          }
        }
      }
  }
}`;
