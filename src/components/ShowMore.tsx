import React from "react";
import { PiCaretRightThin } from "react-icons/pi";
import Link from "next/link";

interface ShowMoreProps {
    href: string;
    className?: string;
    text: string;
}

const ShowMore = ({ href, className, text }: ShowMoreProps) => {
    return (
        <>
            <Link href={href} className={`has-text-black ${className}`}>
                {text}
            </Link>
            <PiCaretRightThin className="ml-1 is-centered" />
        </>
    );
};

export default ShowMore;
