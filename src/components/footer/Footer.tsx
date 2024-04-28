import React from "react";
import Address from "@/src/components/footer/columns/Address";
import Links from "@/src/components/footer/columns/Links";
import Info from "@/src/components/footer/columns/Info";
import Payment from "@/src/components/footer/columns/Payment";
import Socials from "@/src/components/footer/columns/Socials";
import Logo from "./columns/Logo";

const Footer = () => {
    return (
        <footer className="footer has-background-black has-text-white footer__container">
            <div className="columns is-flex is-flex-direction-column">
                <div className="column is-8-desktop is-offset-2-desktop">
                    <Logo />
                    <div className="columns">
                        <Address />
                        <Links />
                        <Info />
                        <Payment />
                        <Socials />
                    </div>
                    <div className="footer__copyright">
                        <p className="has-text-centered">miloui.cz © 2024</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
