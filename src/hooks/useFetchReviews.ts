import {useEffect, useState} from "react";
import {fetchReviews} from "@/src/api/fetch";
import {Review} from "@/src/types/Review";
import {ReviewParser} from "@/src/parsers/ReviewParser";

const useFetchReviews = () => {
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const reviewsResult = await fetchReviews();
            if (reviewsResult) {
                const parsedData = ReviewParser(reviewsResult);
                setReviews(parsedData);
            } else {
                setError('Error fetching reviews');
            }
        };

        fetchData();
    }, []);

    return { reviews, error };
}

export default useFetchReviews;