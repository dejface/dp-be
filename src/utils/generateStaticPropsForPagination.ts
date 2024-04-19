import { getTotalPages } from "@/src/utils/getTotalPages";
import { TransformedData } from "@/src/types/Types";

type QueryType = TransformedData | null;
type FetchFunctionType = () => Promise<QueryType>;

export const generateStaticPropsForPagination = async (
    fetchFunction: FetchFunctionType,
    page: number,
    limit: number,
) => {
    const fetchedItems = await fetchFunction();
    if (!fetchedItems) {
        return {
            notFound: true,
        };
    }
    const totalPages = getTotalPages(fetchedItems.total, limit);

    return {
        props: {
            fetchedItems: fetchedItems.data,
            totalPages,
            currentPage: page,
        },
    };
};
