import React, {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from "react";

import localization from "../localization";
import { useRouter } from "next/router";

type Languages = keyof typeof localization;
type LocalizationKeys = keyof (typeof localization)[Languages];
type LanguageState = [Languages, Dispatch<SetStateAction<Languages>>];

const LanguageContext = createContext<LanguageState>(undefined as never);

export const LanguageProvider = ({ children }: PropsWithChildren<{}>) => {
    const router = useRouter();
    const defaultLanguage = router.locale as Languages;
    const languageState = useState<Languages>(defaultLanguage || "cs");
    return (
        <LanguageContext.Provider value={languageState}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

export const useTranslation = () => {
    const [language] = useContext(LanguageContext);
    return (key: LocalizationKeys) => localization[language][key];
};
