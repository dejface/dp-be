import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, useTranslation } from "@/src/hooks/useTranslation";
import { BLOG_PATH } from "@/src/utils/constants";
import { SupportedLocale } from "@/src/types/Types";

const getNavbarItem = (
    text: string,
    href: string,
    locale: SupportedLocale,
    customClassName = "",
) => {
    const className = `navbar-item ${customClassName}`;
    return (
        <Link href={href} className={className} locale={locale}>
            {text}
        </Link>
    );
};

const Navbar = () => {
    const trans = useTranslation();
    const [locale] = useLanguage();
    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(!isActive);
    };

    const navbarBurgerClass = `navbar-burger ${isActive ? "is-active" : ""}`;
    const navbarMenuClass = `navbar-menu ${isActive ? "is-active" : ""}`;

    return (
        <nav
            className="navbar is-paddingless pt-4 px-1-mobile"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <Link className="navbar-item pl-0" href="/" locale={locale}>
                    <Image
                        src="/miloui.png"
                        width={112}
                        height={28}
                        alt="Miloui Logo"
                    />
                </Link>

                <a
                    role="button"
                    className={navbarBurgerClass}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbar"
                    onClick={toggleNavbar}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbar" className={navbarMenuClass}>
                <div className="navbar-end level">
                    <div className="navbar-item has-dropdown is-hoverable level-item is-hidden-touch">
                        {getNavbarItem(
                            trans("app.products"),
                            "/products",
                            locale,
                            "is-medium",
                        )}
                        <div className="navbar-dropdown">
                            {getNavbarItem(
                                trans("app.earrings"),
                                "/earrings",
                                locale,
                            )}
                            {getNavbarItem(
                                trans("app.rings"),
                                "/rings",
                                locale,
                            )}
                            {getNavbarItem(
                                trans("app.necklaces"),
                                "/necklaces",
                                locale,
                            )}
                        </div>
                    </div>
                    {getNavbarItem(
                        trans("app.earrings"),
                        "/earrings",
                        locale,
                        "is-medium level-item is-hidden-desktop",
                    )}
                    {getNavbarItem(
                        trans("app.rings"),
                        "/rings",
                        locale,
                        "is-medium level-item is-hidden-desktop",
                    )}
                    {getNavbarItem(
                        trans("app.necklaces"),
                        "/necklaces",
                        locale,
                        "is-medium level-item is-hidden-desktop",
                    )}
                    {getNavbarItem(
                        trans("app.contact"),
                        "/contact",
                        locale,
                        "is-medium level-item",
                    )}
                    {getNavbarItem(
                        trans("app.blog"),
                        `/${BLOG_PATH}`,
                        locale,
                        "is-medium level-item",
                    )}
                    {getNavbarItem(
                        trans("app.cart"),
                        "/cart",
                        locale,
                        "app__cart is-medium level-item",
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
