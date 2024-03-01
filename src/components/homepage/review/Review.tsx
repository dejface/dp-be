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
                <div className="has-text-centered">
                    <FaQuoteLeft
                        className="fa-icon"
                        data-testid={"quote-icon"}
                    />
                    <p className="review__description px-4 pb-3 pt-3">
                        {props.description}
                    </p>
                    <figure className="image is-64x64 mx-auto mt-4 mb-5">
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
