import { fetchSlugs } from "@/src/api/fetch";
import { Data } from "@/src/types/Types";

export const generateStaticPropsForSlugs = async (
    fetchFunction: () => Promise<Data | null>,
    query: string,
) => {
    const item = await fetchFunction();
    const itemsSlugs = await fetchSlugs(query);

    if (!item) {
        return {
            notFound: true,
        };
    }

    const mergedSlugs = itemsSlugs.slugsCZ.map((slugCz: string, index) => {
        return {
            cs: slugCz,
            sk: itemsSlugs.slugsSK[index],
        };
    });

    return {
        props: {
            parsedContent: item.data,
            slugs: mergedSlugs,
        },
        revalidate: 1,
    };
};
