import React from "react";
import { LuThumbsUp } from "react-icons/lu";
import { IconType } from "react-icons";
import { useTranslation } from "@/src/contexts/TransContext";

const prepareIcon = (
    IconComponent: IconType,
    title: string,
    description: string,
) => {
    return (
        <div className="column is-4">
            <div className="card is-shadowless">
                <div className="card-content is-paddingless">
                    <div className="icon-columns__icon">
                        <IconComponent
                            data-testid={"icon-component"}
                            className={"fa-icon"}
                        />
                    </div>
                </div>
                <div className="card-content has-text-centered">
                    <p className="icon-columns__title has-text-weight-bold mb-2">
                        {title}
                    </p>
                    <p className="icon-columns__subtitle has-text-grey mt-2">
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
                trans("app.description.resistance"),
            )}

            {prepareIcon(
                LuThumbsUp,
                trans("app.icon.material"),
                trans("app.description.material"),
            )}
            {prepareIcon(
                LuThumbsUp,
                trans("app.icon.care"),
                trans("app.description.care"),
            )}
        </div>
    );
};

export default IconColumns;
