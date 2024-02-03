export const ArticleContentBySlugQuery = (slug: string) => `{
  articleCollection(where: {slug: "${slug}"}, limit: 1) {
    items {
        sys {
          id
        }
        title,
        perex,
        published,
        readTime,
        previewImage {
          url,
          height,
          width,
          title
        }
        content {
          json
          links {
            entries {
              hyperlink {
                sys {
                  id
                }
              }
            }
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
              }
            }
        }
      }
    }
  }
}
`;
