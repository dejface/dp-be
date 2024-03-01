import React from "react";
import { useLanguage } from "../hooks/useTranslation";
import { useRouter } from "next/router";
import { useArticleSlugs } from "@/src/hooks/useArticleSlugsWithLocale";
import { getCurrentPathParts } from "@/src/utils/getCurrentPathParts";
import { getUpdatedSlug } from "@/src/utils/getUpdatedSlug";
import { SupportedLocale } from "@/src/types/Types";
import { getUpdatedPath } from "@/src/utils/getUpdatedPath";
import { getCurrentSlug } from "@/src/utils/getCurrentSlug";
import {
    ARTICLE_PATH,
    EARRINGS_PATH,
    NECKLACES_PATH,
    RINGS_PATH,
} from "@/src/utils/constants";
import { useProductSlugs } from "@/src/hooks/useProductSlugsWithLocale";

const LanguageSwitch = () => {
    const router = useRouter();
    const [language, setLanguage] = useLanguage();
    const [productSlugs] = useProductSlugs();
    const [articleSlugs] = useArticleSlugs();
    const slugs = [...articleSlugs, ...productSlugs];

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const targetLocale = event.target.value as SupportedLocale;
        setLanguage(targetLocale);

        let currentPath = getCurrentPathParts();
        if (
            [ARTICLE_PATH, EARRINGS_PATH, RINGS_PATH, NECKLACES_PATH].some(
                (path) => currentPath.includes(path),
            )
        ) {
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
