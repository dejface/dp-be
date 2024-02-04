import React from "react";
import { PiCaretRightThin } from "react-icons/pi";
import Link from "next/link";
import { useLanguage } from "@/src/hooks/useTranslation";

interface ShowMoreProps {
    href: string;
    className?: string;
    text: string;
}

const ShowMore = ({ href, className, text }: ShowMoreProps) => {
    const [locale] = useLanguage();
    return (
        <>
            <Link
                href={href}
                className={`has-text-black ${className}`}
                locale={locale}
            >
                {text}
            </Link>
            <PiCaretRightThin className="ml-1 is-centered" />
        </>
    );
};

export default ShowMore;
