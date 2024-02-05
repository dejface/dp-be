import { fetchTotalArticleCount } from "@/src/api/fetch";
import { getTotalPages } from "@/src/utils/getTotalPages";
import { ARTICLE_COUNT_BLOG_PAGE_LIMIT } from "@/src/utils/constants";
import { generatePaths } from "@/src/utils/generatePaths";

export const generateStaticPaths = async () => {
    const totalPosts = await fetchTotalArticleCount();
    const totalPages = getTotalPages(totalPosts, ARTICLE_COUNT_BLOG_PAGE_LIMIT);
    const paths = generatePaths(totalPages);

    return {
        paths,
        fallback: false,
    };
};
