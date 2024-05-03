import Layout from "@/src/components/Layout";
import { SupportedLocale } from "@/src/types/Types";
import { fetchLegalDocuments } from "@/src/api/fetch";
import { PRIVACY_POLICY_PATH } from "@/src/utils/constants";
import { RichTextContentParser } from "@/src/parsers/RichTextContentParser";
import { generateStaticPropsForLegalDocuments } from "@/src/utils/generateStaticPropsForLegalDocuments";
import { useTranslation } from "@/src/contexts/TransContext";
import { LegalDocumentPageProps } from "@/src/types/Page";

const PrivacyPolicyIndex = ({ document }: LegalDocumentPageProps) => {
    const trans = useTranslation();
    const content = RichTextContentParser(document.text);
    return (
        <Layout>
            <div className="has-text-weight-bold is-size-3 is-size-5-mobile px-1-mobile">
                {trans("app.privacy_policy")}
            </div>
            <div className="px-1-mobile">{content}</div>
        </Layout>
    );
};

export async function getStaticProps({ locale }: { locale: SupportedLocale }) {
    return generateStaticPropsForLegalDocuments(() =>
        fetchLegalDocuments(PRIVACY_POLICY_PATH, locale),
    );
}

export default PrivacyPolicyIndex;
