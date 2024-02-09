import { getTotalPages } from "@/src/utils/getTotalPages";
import { generatePaths } from "@/src/utils/generatePaths";

export const generateStaticPaths = async (
    fetchFunction: () => Promise<number>,
    limit: number,
) => {
    const totalPosts = await fetchFunction();
    const totalPages = getTotalPages(totalPosts, limit);
    const paths = generatePaths(totalPages);

    return {
        paths,
        fallback: false,
    };
};
