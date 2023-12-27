import React from 'react';
import { useLanguage, useTranslation } from '../hooks/useTranslation';

const LanguageSwitch = () => {
    const [language, setLanguage] = useLanguage();
    const t = useTranslation();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as any);
    };

    return (
        <div>
            <select id="language-select" value={language} onChange={handleLanguageChange}>
                <option value="sk">Slovak</option>
                <option value="cs">Czech</option>
            </select>
        </div>
    );
};

export default LanguageSwitch;