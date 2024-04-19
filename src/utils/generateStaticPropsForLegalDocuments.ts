import { LegalDocument } from "@/src/types/Types";

export const generateStaticPropsForLegalDocuments = async (
    fetchFunction: () => Promise<LegalDocument | null>,
) => {
    const item = await fetchFunction();
    if (!item) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            document: item,
        },
        revalidate: 30,
    };
};
