import React from 'react';
import { useLanguage } from '../hooks/useTranslation';

const LanguageSwitch = () => {
    const [language, setLanguage] = useLanguage();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as any);
    };

    return (
        <div className="control">
            <div className="select is-small">
                <select id="language-select" value={language} onChange={handleLanguageChange}>
                    <option value="sk">Slovenčina</option>
                    <option value="cs">Čeština</option>
                </select>
            </div>
        </div>
    );
};

export default LanguageSwitch;