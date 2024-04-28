import React from "react";
import { PiCaretRightThin } from "react-icons/pi";
import Link from "next/link";
import { IconType } from "react-icons";
import classNames from "classnames";
import { useLanguage } from "@/src/contexts/TransContext";

interface ShowMoreProps {
    text: string;
    href: string;
    Icon?: IconType;
    onClick?: (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => Promise<void>;
    className?: string;
    iconPosition?: "left" | "right";
}

const ShowMore = ({
    href,
    text,
    onClick,
    className = "",
    Icon = PiCaretRightThin,
    iconPosition = "right",
}: ShowMoreProps) => {
    const [locale] = useLanguage();
    return (
        <>
            {iconPosition === "left" && Icon && (
                <div className="is-flex is-align-items-center">
                    <Icon className="mr-1 is-centered" data-testid="icon-svg" />
                </div>
            )}
            <div className="show-more">
                <Link
                    href={href}
                    className={classNames("show-more__text", className)}
                    locale={locale}
                    onClick={onClick}
                >
                    {text}
                </Link>
            </div>
            {iconPosition === "right" && Icon && (
                <Icon className="ml-1 is-centered" data-testid="icon-svg" />
            )}
        </>
    );
};

export default ShowMore;
