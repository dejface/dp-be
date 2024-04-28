import { LOCALE_CS } from "@/src/utils/constants";

export const getUpdatedPath = (
    updatedLocale: string,
    pathParts: string[],
    queryString: string = "",
) => {
    const currentPath = !pathParts[0] ? "" : `/${pathParts.join("/")}`;

    const newPath =
        updatedLocale === LOCALE_CS
            ? currentPath
            : `/${updatedLocale}${currentPath}`;

    return queryString !== "" ? `${newPath}${queryString}` : newPath;
};
