export const ArticlePreviewQuery = `{
  articleCollection {
    items {
        title,
        perex,
        previewImage {
            url
            width
            height
        }
    }
  }
}`;