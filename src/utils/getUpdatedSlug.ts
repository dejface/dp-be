import { SupportedLocale } from "@/src/types/Types";
import { SlugPair } from "@/src/types/Slugs";

export const getUpdatedSlug = (
    slugs: SlugPair[],
    currentSlug: string,
    currentLocale: SupportedLocale,
    targetLocale: SupportedLocale,
) => {
    const updatedSlug = slugs.find(
        (slug: SlugPair) => slug[currentLocale] === currentSlug,
    );
    return updatedSlug ? updatedSlug[targetLocale] : "";
};
