export const useTransMock = (
    mockTranslations: { [key: string]: string },
    mockLanguage = "cs",
) => {
    return {
        useTranslation: () => {
            return (key: string) => mockTranslations[key] || key;
        },
        useLanguage: () => [mockLanguage],
    };
};
