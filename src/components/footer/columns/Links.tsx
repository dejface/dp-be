import Link from "next/link";
import {
    CONTACT_PATH,
    PRIVACY_POLICY_PATH,
    RETURN_POLICY_PATH,
    TERMS_AND_CONDITIONS_PATH,
} from "@/src/utils/constants";
import React from "react";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";

const Links = () => {
    const trans = useTranslation();
    const [locale] = useLanguage();
    return (
        <div className="column">
            <p className="has-text-weight-bold">
                {trans("app.footer.order_info").toUpperCase()}
            </p>
            <p>
                <Link href={`/${TERMS_AND_CONDITIONS_PATH}`} locale={locale}>
                    {trans("app.terms_and_conditions")}
                </Link>
            </p>
            <p>
                <Link href={`/${PRIVACY_POLICY_PATH}`} locale={locale}>
                    {trans("app.privacy_policy")}
                </Link>
            </p>
            <p>
                <Link href={`/${RETURN_POLICY_PATH}`} locale={locale}>
                    {trans("app.return_policy")}
                </Link>
            </p>
            <p>
                <Link href={`/${CONTACT_PATH}`} locale={locale}>
                    {trans("app.contact")}
                </Link>
            </p>
        </div>
    );
};

export default Links;
