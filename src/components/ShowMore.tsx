import React from "react";
import { PiCaretRightThin } from "react-icons/pi";
import Link from "next/link";
import { useLanguage } from "@/src/hooks/useTranslation";
import { IconType } from "react-icons";
import classNames from "classnames";

interface ShowMoreProps {
    text: string;
    href: string;
    Icon?: IconType;
    onClick?: (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => Promise<void>;
    className?: string;
}

const ShowMore = ({
    href,
    text,
    onClick,
    className = "",
    Icon = PiCaretRightThin,
}: ShowMoreProps) => {
    const [locale] = useLanguage();
    return (
        <>
            <div className="show-more">
                <Link
                    href={href}
                    className={classNames("has-text-black", className)}
                    locale={locale}
                    onClick={onClick}
                >
                    {text}
                </Link>
            </div>
            <Icon className="ml-1 is-centered" data-testid="icon-svg" />
        </>
    );
};

export default ShowMore;
