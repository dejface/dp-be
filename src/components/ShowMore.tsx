import React from "react";
import { PiCaretRightThin } from "react-icons/pi";

interface ShowMoreProps {
    href: string;
    className?: string;
    text: string;
}

const ShowMore = ({ href, className, text }: ShowMoreProps) => {
    return (
        <>
            <a href={href} className={`has-text-black ${className}`}>
                {text}
            </a>
            <PiCaretRightThin className="ml-1 is-centered" />
        </>
    );
};

export default ShowMore;
