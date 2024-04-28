import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    BLOG_PATH,
    BRACELETS_PATH,
    CART_PATH,
    CONTACT_PATH,
    EARRINGS_PATH,
    NECKLACES_PATH,
    PRODUCTS_PATH,
    RINGS_PATH,
} from "@/src/utils/constants";
import { SupportedLocale } from "@/src/types/Types";
import { useShoppingCart } from "@/src/contexts/ShoppingCartContext";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";

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
    const { totalItems } = useShoppingCart();

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
                <Link href={"/"} locale={locale}>
                    <Image
                        src="/miloui.png"
                        width={102}
                        height={37}
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

            <div id="navbar" data-testid="navbar" className={navbarMenuClass}>
                <div className="navbar-end level">
                    <div className="navbar-item has-dropdown is-hoverable level-item is-hidden-touch">
                        {getNavbarItem(
                            trans("app.products"),
                            `/${PRODUCTS_PATH}`,
                            locale,
                            "is-medium",
                        )}
                        <div className="navbar-dropdown">
                            {getNavbarItem(
                                trans("app.earrings"),
                                `/${PRODUCTS_PATH}/${EARRINGS_PATH}`,
                                locale,
                            )}
                            {getNavbarItem(
                                trans("app.rings"),
                                `/${PRODUCTS_PATH}/${RINGS_PATH}`,
                                locale,
                            )}
                            {getNavbarItem(
                                trans("app.necklaces"),
                                `/${PRODUCTS_PATH}/${NECKLACES_PATH}`,
                                locale,
                            )}
                            {getNavbarItem(
                                trans("app.bracelets"),
                                `/${PRODUCTS_PATH}/${BRACELETS_PATH}`,
                                locale,
                            )}
                        </div>
                    </div>
                    {getNavbarItem(
                        trans("app.products"),
                        `/${PRODUCTS_PATH}`,
                        locale,
                        "is-medium level-item is-hidden-desktop",
                    )}
                    {getNavbarItem(
                        trans("app.contact"),
                        `/${CONTACT_PATH}`,
                        locale,
                        "is-medium level-item",
                    )}
                    {getNavbarItem(
                        trans("app.blog"),
                        `/${BLOG_PATH}`,
                        locale,
                        "is-medium level-item",
                    )}
                    <Link
                        href={`/${CART_PATH}`}
                        className={"navbar-item cart is-medium level-item"}
                        locale={locale}
                    >
                        <span>{trans("app.cart")}</span>
                        <div className="bubble-icon">{totalItems}</div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
