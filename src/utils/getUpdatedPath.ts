import { LOCALE_CS } from "@/src/utils/constants";

export const getUpdatedPath = (updatedLocale: string, pathParts: string[]) => {
    const currentPath = !pathParts[0] ? "" : `/${pathParts.join("/")}`;

    return updatedLocale === LOCALE_CS
        ? currentPath
        : `/${updatedLocale}${currentPath}`;
};
