import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";
import { StaticProps } from "@/src/types/Page";

export const generatePaths = (totalPages: number) => {
    const paths: StaticProps<string, string>[] = [];

    for (let page = 2; page <= totalPages; page++) {
        [LOCALE_CS, LOCALE_SK].forEach((locale) => {
            paths.push({ params: { page: page.toString() }, locale });
        });
    }

    return paths;
};
