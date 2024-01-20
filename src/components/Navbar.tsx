import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/src/hooks/useTranslation";

const Navbar = () => {
    const trans = useTranslation();
    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(!isActive);
    };

    const navbarBurgerClass = `navbar-burger ${isActive ? "is-active" : ""}`;
    const navbarMenuClass = `navbar-menu ${isActive ? "is-active" : ""}`;

    return (
        <nav
            className="navbar is-paddingless pt-4"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <Link className="navbar-item pl-0" href="/">
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
                    <div className="navbar-item has-dropdown is-hoverable level-item">
                        <a className="navbar-item is-medium">
                            {trans("app.products")}
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                {trans("app.earrings")}
                            </a>
                            <a className="navbar-item">{trans("app.rings")}</a>
                            <a className="navbar-item">
                                {trans("app.necklaces")}
                            </a>
                        </div>
                    </div>
                    <a className="navbar-item is-medium level-item">
                        {trans("app.contact")}
                    </a>
                    <a className="navbar-item is-medium level-item">
                        {trans("app.blog")}
                    </a>
                    <a className="navbar-item is-medium app__cart level-item">
                        {trans("app.cart")}
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
