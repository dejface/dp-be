import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";

export type SupportedLocale = typeof LOCALE_CS | typeof LOCALE_SK;

export type SlugPair = {
    cs: string;
    sk: string;
};
