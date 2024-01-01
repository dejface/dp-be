import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp, IconDefinition} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import {useTranslation} from "@/src/hooks/useTranslation";

const prepareIcon = (icon: IconDefinition, title: string, description: string) => {
    return (
        <div className="column is-4">
            <div className="card is-shadowless">
                <div className="card-content is-paddingless">
                    <div className="icon-square">
                        <FontAwesomeIcon className="fa-icon" icon={icon}/>
                    </div>
                </div>
                <div className="card-content has-text-centered">
                    <p className="title has-text-weight-bold is-size-5 mb-2">{title}</p>
                    <p className="subtitle has-text-grey is-size-6 mt-2">{description}</p>
                </div>
            </div>
        </div>
    );
}

const IconColumns = () => {
    const trans = useTranslation();
    return (
        <div className="columns is-variable is-1 is-mobile mt-6">
            {prepareIcon(faThumbsUp, trans('app.icon.resistance'), "description resistance")}
            {prepareIcon(faThumbsUp, trans('app.icon.material'), "description material")}
            {prepareIcon(faThumbsUp, trans('app.icon.care'), "description care")}
        </div>
    );
}

export default IconColumns;