import { fetchSlugs } from "@/src/api/fetch";

export const generateStaticPathsForSlugs = async (query: string) => {
    const slugs = await fetchSlugs(query);

    const paths = [
        ...slugs.slugsCZ.map((slug: string) => ({
            params: { slug },
            locale: "cs",
        })),
        ...slugs.slugsSK.map((slug: string) => ({
            params: { slug },
            locale: "sk",
        })),
    ];

    return {
        paths,
        fallback: true,
    };
};
