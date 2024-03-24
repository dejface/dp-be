import React from "react";
import { Review as ReviewType } from "@/src/types/Review";
import Review from "@/src/components/homepage/review/Review";

interface ReviewsSectionProps {
    reviews: ReviewType[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
    return (
        <div className="columns reviews__section is-multiline is-paddingless is-marginless pt-6 px-1-mobile is-mobile">
            {reviews.map((review, index) => (
                <Review
                    key={index}
                    reviewer={review.reviewer}
                    description={review.description}
                    image={review.image}
                />
            ))}
        </div>
    );
};

export default ReviewsSection;
