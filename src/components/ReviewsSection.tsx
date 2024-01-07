import React from "react";
import Review from "@/src/components/Review";
import useFetchReviews from "@/src/hooks/useFetchReviews";

const ReviewsSection = () => {
    const reviews = useFetchReviews();

    return (
        <div className="columns reviews__section is-multiline is-paddingless pt-6">
            {reviews.reviews && reviews.reviews.map((review, index) => (
                <Review
                    key={index}
                    reviewer={review.reviewer}
                    description={review.description}
                    image={review.image}
                />
            ))}
        </div>
    );
}

export default ReviewsSection;
