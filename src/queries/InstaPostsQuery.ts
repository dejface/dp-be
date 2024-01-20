export const InstaPostsQuery = `{
  instaPostCollection {
    items {
        author,
        caption,
        url,
        image {
            url,
            width,
            height
        }
    }
  }
}`;
