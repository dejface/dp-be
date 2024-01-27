export const ArticlePreviewQuery = (limit: number) => `{
  articleCollection(limit: ${limit}, order: published_DESC) {
    items {
        sys {
            id
        }
        title,
        perex,
        published,
        readTime,
        previewImage {
            url
            width
            height
        }
    }
  }
}`;
