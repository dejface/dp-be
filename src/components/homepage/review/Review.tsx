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
        <div className="column is-one-third is-paddingless">
            <div className="box review is-shadowless">
                <div className="has-text-centered">
                    <div className="is-size-5 pb-3">
                        <FaQuoteLeft className="fa-icon" />
                    </div>
                    <div className="is-size-6 mt-3 review__description">
                        {props.description}
                    </div>
                    <figure className="image is-64x64 mx-auto mt-3 mb-6">
                        <Image
                            src={props.image.url}
                            alt={"alt"}
                            width={64}
                            height={64}
                            className={"is-rounded"}
                        />
                        <figcaption className="is-size-7 mt-3">
                            {props.reviewer}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default Review;
