import { SupportedLocale } from "@/src/types/Types";

export const TopProductQuery = (locale: SupportedLocale) => `{
    productCollection (where: {topProduct: true}, locale: "${locale}") {
        items {
            sys {
              id,
            }
            title,
            slug,
            imageGalleryCollection {
                items {
                    description,
                    url,
                    width,
                    height
                }
            }
            category {
                sys {
                    id
                }
            ... on Category {
                title
                }
            },
        }
    }
}`;
