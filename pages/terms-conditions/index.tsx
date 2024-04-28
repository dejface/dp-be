import Layout from "@/src/components/Layout";
import { SupportedLocale } from "@/src/types/Types";
import { generateStaticPropsForLegalDocuments } from "@/src/utils/generateStaticPropsForLegalDocuments";
import { fetchLegalDocuments } from "@/src/api/fetch";
import { TERMS_AND_CONDITIONS_PATH } from "@/src/utils/constants";
import { useTranslation } from "@/src/contexts/TransContext";
import { RichTextContentParser } from "@/src/parsers/RichTextContentParser";
import { LegalDocumentPageProps } from "@/src/types/Page";

const TermsConditionsIndex = ({ document }: LegalDocumentPageProps) => {
    const trans = useTranslation();
    const content = RichTextContentParser(document.text);

    return (
        <Layout>
            <div className="has-text-weight-bold is-size-3">
                {trans("app.terms_and_conditions")}
            </div>
            <div className="">{content}</div>
        </Layout>
    );
};

export async function getStaticProps({ locale }: { locale: SupportedLocale }) {
    return generateStaticPropsForLegalDocuments(() =>
        fetchLegalDocuments(TERMS_AND_CONDITIONS_PATH, locale),
    );
}

export default TermsConditionsIndex;
