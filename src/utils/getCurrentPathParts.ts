import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";

export const getCurrentPathParts = (): {
    pathParts: string[];
    queryString: string;
} => {
    const currentPath = window.location.pathname;
    const queryString = window.location.search;
    const pathParts = currentPath.split("/").filter((part) => part !== "");

    if ([LOCALE_CS, LOCALE_SK].includes(pathParts[0])) {
        pathParts.shift();
    }

    return { pathParts, queryString };
};
