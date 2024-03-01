export const ProductSlugsQuery = (categoryId: string) => {
    return `{
        slugsCZ: productCollection(order: sys_publishedAt_DESC, locale: "cs", where: {category: {sys: {id: "${categoryId}"}}}) {
            items {
                slug
            }
        }
        slugsSK: productCollection(order: sys_publishedAt_DESC, locale: "sk", where: {category: {sys: {id: "${categoryId}"}}}){
            items {
                slug
            }
        }
    }`;
};
