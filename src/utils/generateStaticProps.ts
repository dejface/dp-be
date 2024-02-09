import { getTotalPages } from "@/src/utils/getTotalPages";
import { SupportedLocale, TransformedData } from "@/src/types/Types";

type QueryType = TransformedData | null;

export const generateStaticProps = async (
    fetchFunction: (
        limit: number,
        locale: SupportedLocale,
        page: number,
    ) => Promise<QueryType>,
    locale: SupportedLocale,
    page: number,
    limit: number,
) => {
    const fetchedItems = await fetchFunction(limit, locale, page);
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
