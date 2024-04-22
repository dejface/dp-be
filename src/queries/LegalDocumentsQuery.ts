import { SupportedLocale } from "@/src/types/Types";

export const LegalDocumentsQuery = (
    documentType: string,
    locale: SupportedLocale,
) => `{
    legalDocumentsCollection (where: {type: "${documentType}"}, locale: "${locale}", limit: 1){
        items {
          text(locale: "${locale}") {
            json,
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
              },
              hyperlink {
                sys {
                  id
                },
                url
              }
            }
          }
        }
      }
    }
}`;
