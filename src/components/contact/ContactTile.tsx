import { PiEnvelopeThin } from "react-icons/pi";
import { useTranslation } from "@/src/contexts/TransContext";
import { INFO_MAIL, INFO_PHONE } from "@/src/utils/constants";

const ContactTile = () => {
    const trans = useTranslation();
    return (
        <div className="column has-text-centered is-8 is-offset-2 my-4">
            <PiEnvelopeThin
                className={"is-size-3"}
                data-testid={"contact-tile-icon"}
            />
            <div className="is-size-6 has-text-weight-semibold">
                {trans("app.contact").toUpperCase()}
            </div>
            <div className="is-size-6 mt-4 mb-4">{INFO_MAIL}</div>
            <div className="is-size-6 mt-4 contact-tile-title">
                {INFO_PHONE}
            </div>
        </div>
    );
};

export default ContactTile;
