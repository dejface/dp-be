import { SupportedLocale } from "@/src/types/Types";

export const ReviewsQuery = (locale: SupportedLocale) => `{
    reviewCollection(locale: "${locale}") {
        items {
            reviewer,
            description
            image {
                url,
                width,
                height
            }
        }
    }
}`;
