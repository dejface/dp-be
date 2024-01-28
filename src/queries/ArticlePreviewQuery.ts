export const ArticlePreviewQuery = (limit: number, skip = 0) => `{
  articleCollection(limit: ${limit}, skip: ${skip}, order: published_DESC) {
    total,
    items {
        sys {
            id
        }
        slug,
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
