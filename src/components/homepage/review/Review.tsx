import Image from "next/image";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

interface ReviewProps {
    reviewer: string;
    description: string;
    image: {
        url: string;
        width: number;
        height: number;
    };
}

const Review = (props: ReviewProps) => {
    return (
        <div className="column is-one-third-desktop is-full-mobile">
            <div className="box review is-shadowless">
                <div className="review__content has-text-centered">
                    <FaQuoteLeft
                        className="fa-icon mb-2"
                        data-testid={"quote-icon"}
                    />
                    <p className="review__content review__description px-4 pb-3 pt-3">
                        {props.description}
                    </p>
                    <figure className="image review__image is-64x64 mx-auto mt-4 mb-5">
                        <Image
                            src={props.image.url}
                            alt={"Image of " + props.reviewer}
                            width={64}
                            height={64}
                            className="is-rounded"
                        />
                        <figcaption className="is-size-7 mt-2">
                            {props.reviewer}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default Review;
