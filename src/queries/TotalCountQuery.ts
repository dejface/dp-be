export const TotalCountQuery = (
    collection: string,
    whereCondition?: string,
) => {
    const where = whereCondition ? `(where: {${whereCondition}: true})` : "";
    return `{
    ${collection} ${where} {
    total
  }
}`;
};
