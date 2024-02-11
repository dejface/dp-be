export const ProductSlugsQuery = `{
    slugsCZ: productCollection(order: sys_publishedAt_DESC, locale: "cs"){
        items {
            slug
        }
    }
    slugsSK: productCollection(order: sys_publishedAt_DESC, locale: "sk"){
        items {
            slug
        }
    }
}`;
