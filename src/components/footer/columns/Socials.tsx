import SocialIcon from "@/src/components/SocialIcon";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/src/utils/constants";
import { BsInstagram } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import React from "react";
import { useTranslation } from "@/src/contexts/TransContext";

const Socials = () => {
    const trans = useTranslation();
    return (
        <div className="column">
            <p className="has-text-weight-bold mb-2">
                {trans("app.follow_us").toUpperCase()}
            </p>
            <p className="has-text-beige">
                <SocialIcon
                    href={TIKTOK_URL}
                    Icon={FaTiktok}
                    className={"mr-3"}
                />
                <SocialIcon href={INSTAGRAM_URL} Icon={BsInstagram} />
            </p>
        </div>
    );
};

export default Socials;
