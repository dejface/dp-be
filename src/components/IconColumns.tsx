import React from "react";
import { useTranslation } from "@/src/hooks/useTranslation";
import { LuThumbsUp } from "react-icons/lu";
import { IconType } from "react-icons";

const prepareIcon = (
    IconComponent: IconType,
    title: string,
    description: string,
) => {
    return (
        <div className="column is-4">
            <div className="card is-shadowless">
                <div className="card-content is-paddingless">
                    <div className="icon__square">
                        <IconComponent className={"fa-icon"} />
                    </div>
                </div>
                <div className="card-content has-text-centered">
                    <p className="title has-text-weight-bold is-size-5-desktop is-size-6-tablet is-size-7-mobile mb-2">
                        {title}
                    </p>
                    <p className="subtitle has-text-grey is-size-6-desktop is-size-7-touch mt-2">
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
        <div className="columns is-variable is-1 is-mobile mt-6">
            {prepareIcon(
                LuThumbsUp,
                trans("app.icon.resistance"),
                "description resistance",
            )}

            {prepareIcon(
                LuThumbsUp,
                trans("app.icon.material"),
                "description material",
            )}
            {prepareIcon(
                LuThumbsUp,
                trans("app.icon.care"),
                "description care",
            )}
        </div>
    );
};

export default IconColumns;
