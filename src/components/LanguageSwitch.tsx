import React from "react";
import { useLanguage } from "../hooks/useTranslation";
import { useRouter } from "next/router";
import { useArticleSlugs } from "@/src/hooks/useArticleSlugsWithLocale";
import { getCurrentPathParts } from "@/src/utils/getCurrentPathParts";
import { getUpdatedSlug } from "@/src/utils/getUpdatedSlug";
import { SupportedLocale } from "@/src/types/Types";
import { getUpdatedPath } from "@/src/utils/getUpdatedPath";
import { getCurrentSlug } from "@/src/utils/getCurrentSlug";
import { ARTICLE_PATH } from "@/src/utils/constants";

const LanguageSwitch = () => {
    const router = useRouter();
    const [language, setLanguage] = useLanguage();
    const [slugs] = useArticleSlugs();

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const targetLocale = event.target.value as SupportedLocale;
        setLanguage(targetLocale);

        let currentPath = getCurrentPathParts();
        if (currentPath.includes(ARTICLE_PATH)) {
            const currentSlug = getCurrentSlug(currentPath);

            currentPath[2] = getUpdatedSlug(
                slugs,
                currentSlug,
                language,
                targetLocale,
            );
        }
        const updatedPath = getUpdatedPath(targetLocale, currentPath);
        router.push(updatedPath, updatedPath, { locale: targetLocale });
    };

    return (
        <div className="control">
            <div className="select is-small">
                <select
                    className="currency-select"
                    data-testid="language-select"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <option value="sk">🇸🇰 EUR</option>
                    <option value="cs">🇨🇿 CZK</option>
                </select>
            </div>
        </div>
    );
};

export default LanguageSwitch;
