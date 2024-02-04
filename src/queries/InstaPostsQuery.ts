import { SupportedLocale } from "@/src/types/Types";

export const InstaPostsQuery = (locale: SupportedLocale) => `{
  instaPostCollection(locale: "${locale}") {
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
