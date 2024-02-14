import { SupportedLocale } from "@/src/types/Types";

export type SlugPair = {
    cs: string;
    sk: string;
};

export interface SlugProps {
    params: {
        slug: string;
        slugs: SlugPair[];
    };
    locale: SupportedLocale;
}

export type LocalizedSlugs = {
    slugsCZ: string[];
    slugsSK: string[];
};
