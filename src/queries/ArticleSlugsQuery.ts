export const ArticleSlugsQuery = `{
    articleCollection(order: published_DESC){
        items {
            slug
        }
    }
}`;
