import { PiStarThin } from "react-icons/pi";
import { useTranslation } from "@/src/contexts/TransContext";
import { BsInstagram } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/src/utils/constants";
import SocialIcon from "@/src/components/SocialIcon";

const SocialsTile = () => {
    const trans = useTranslation();
    return (
        <div className="column has-text-centered is-8 is-offset-2 my-4">
            <PiStarThin
                className={"is-size-3"}
                data-testid={"socials-tile-icon"}
            />
            <div className="is-size-6 has-text-weight-semibold">
                {trans("app.contact.socials_title").toUpperCase()}
            </div>
            <div className="is-size-6 mt-4 mb-4">
                {trans("app.contact.socials_description")}
            </div>
            <div className="columns is-centered is-mobile">
                <div className="column is-2 social-icon-column">
                    <SocialIcon href={INSTAGRAM_URL} Icon={BsInstagram} />
                </div>
                <div className="column is-2 social-icon-column">
                    <SocialIcon href={TIKTOK_URL} Icon={FaTiktok} />
                </div>
            </div>
        </div>
    );
};

export default SocialsTile;
