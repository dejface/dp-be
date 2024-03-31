import React from "react";
import { useRouter } from "next/router";
import { getCurrentPathParts } from "@/src/utils/getCurrentPathParts";
import { getUpdatedSlug } from "@/src/utils/getUpdatedSlug";
import { SupportedLocale } from "@/src/types/Types";
import { getUpdatedPath } from "@/src/utils/getUpdatedPath";
import { getCurrentSlug } from "@/src/utils/getCurrentSlug";
import {
    ARTICLE_PATH,
    BRACELETS_PATH,
    EARRINGS_PATH,
    NECKLACES_PATH,
    RINGS_PATH,
} from "@/src/utils/constants";
import { useLanguage } from "@/src/contexts/TransContext";
import { useProductSlugs } from "@/src/contexts/ProductSlugsContext";
import { useArticleSlugs } from "@/src/contexts/ArticleSlugsContext";

const LanguageSwitch = () => {
    const router = useRouter();
    const [language, setLanguage] = useLanguage();
    const [productSlugs] = useProductSlugs();
    const [articleSlugs] = useArticleSlugs();
    const slugs = [...(articleSlugs || []), ...(productSlugs || [])];

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const targetLocale = event.target.value as SupportedLocale;
        setLanguage(targetLocale);

        let { pathParts, queryString } = getCurrentPathParts();
        if (
            [
                ARTICLE_PATH,
                EARRINGS_PATH,
                RINGS_PATH,
                NECKLACES_PATH,
                BRACELETS_PATH,
            ].some((path) => pathParts.includes(path))
        ) {
            const currentSlug = getCurrentSlug(pathParts);

            pathParts[2] = getUpdatedSlug(
                slugs,
                currentSlug,
                language,
                targetLocale,
            );
        }
        const updatedPath = getUpdatedPath(
            targetLocale,
            pathParts,
            queryString,
        );
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
