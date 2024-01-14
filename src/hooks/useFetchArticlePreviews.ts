import {useEffect, useState} from "react";
import {ArticlePreview} from "@/src/types/ArticlePreview";
import {fetchArticlePreviews} from "@/src/api/fetch";
import {ArticlePreviewParser} from "@/src/parsers/ArticlePreviewParser";

const useFetchArticlePreviews = () => {
    const [previews, setPreviews] = useState<ArticlePreview[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPreviews = await fetchArticlePreviews();
            if (fetchedPreviews) {
                const parsedData = ArticlePreviewParser(fetchedPreviews);
                setPreviews(parsedData);
            } else {
                setError('Error fetching article previews');
            }
        };

        fetchData();
    }, []);

    return { previews, error };
}

export default useFetchArticlePreviews;