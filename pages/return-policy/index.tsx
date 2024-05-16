import Layout from "@/src/components/Layout";
import { useTranslation } from "@/src/contexts/TransContext";
import { RichTextContentParser } from "@/src/parsers/RichTextContentParser";
import { LegalDocumentPageProps } from "@/src/types/Page";
import { SupportedLocale } from "@/src/types/Types";
import { generateStaticPropsForLegalDocuments } from "@/src/utils/generateStaticPropsForLegalDocuments";
import { fetchLegalDocuments } from "@/src/api/fetch";
import { RETURN_POLICY_PATH } from "@/src/utils/constants";

const ReturnPolicyIndex = ({ document }: LegalDocumentPageProps) => {
    const trans = useTranslation();
    const content = RichTextContentParser(document.text);

    return (
        <Layout>
            <div className="has-text-weight-bold is-size-3 is-size-5-mobile px-1-mobile">
                {trans("app.return_policy")}
            </div>
            <div className="px-1-mobile">{content}</div>
        </Layout>
    );
};

export async function getStaticProps({ locale }: { locale: SupportedLocale }) {
    return generateStaticPropsForLegalDocuments(() =>
        fetchLegalDocuments(RETURN_POLICY_PATH, locale),
    );
}

export default ReturnPolicyIndex;
