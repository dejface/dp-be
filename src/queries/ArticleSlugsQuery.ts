export const ArticleSlugsQuery = `{
    slugsCZ: articleCollection(order: published_DESC, locale: "cs"){
        items {
            slug
        }
    }
    slugsSK: articleCollection(order: published_DESC, locale: "sk"){
        items {
            slug
        }
    }
}`;
