export const ArticleContentBySlugQuery = (slug: string) => `{
  articleCollection(where: {slug: "${slug}"}, limit: 1) {
    items {
        sys {
          id
        }
        title
        content {
          json
          links {
            assets { 
              block {
                sys {
                  id
                }
                url
                title
                width
                height
                description
                contentType 
              }
            }
          }
        }
        published
        readTime
        perex
        previewImage {
          url
          width
          height
        }
    }
  }
}
`;
