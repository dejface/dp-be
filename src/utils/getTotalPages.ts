export const getTotalPages = (total: number, limit: number) => {
    return Math.ceil(total / limit);
};
