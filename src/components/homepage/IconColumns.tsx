import React from "react";
import { useTranslation } from "@/src/contexts/TransContext";
import { IoMdCheckmark } from "react-icons/io";

const prepareIcon = (title: string, description: string) => {
    return (
        <div className="column is-4">
            <div className="card is-shadowless">
                <div className="card-content is-paddingless">
                    <div className="icon-columns__icon">
                        <IoMdCheckmark
                            data-testid={"icon-component"}
                            className={"fa-icon"}
                        />
                    </div>
                </div>
                <div className="card-content has-text-centered">
                    <p className="icon-columns__title has-text-weight-bold mb-1">
                        {title}
                    </p>
                    <p className="icon-columns__subtitle has-text-beige m-0">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const IconColumns = () => {
    const trans = useTranslation();
    return (
        <div className="columns is-variable is-1 is-mobile mt-6 mt-0-mobile mt-4-tablet">
            {prepareIcon(
                trans("app.icon.resistance"),
                trans("app.description.resistance"),
            )}

            {prepareIcon(
                trans("app.icon.price_quality"),
                trans("app.description.price_quality"),
            )}
            {prepareIcon(
                trans("app.icon.timelessness"),
                trans("app.description.timelessness"),
            )}
        </div>
    );
};

export default IconColumns;
