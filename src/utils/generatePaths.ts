import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";
import { StaticPathsWithLocale } from "@/src/types/Types";

export const generatePaths = (totalPages: number) => {
    const paths: StaticPathsWithLocale[] = [];

    for (let page = 2; page <= totalPages; page++) {
        [LOCALE_CS, LOCALE_SK].forEach((locale) => {
            paths.push({ params: { page: page.toString() }, locale });
        });
    }

    return paths;
};
