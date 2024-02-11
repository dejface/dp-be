export const getCurrentSlug = (pathParts: string[]) => {
    if (pathParts.length < 3) {
        return "";
    }
    return pathParts[2];
};
