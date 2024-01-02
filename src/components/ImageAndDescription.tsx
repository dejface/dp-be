import React from "react";
import {useTranslation} from "@/src/hooks/useTranslation";

const ImageAndDescription = () => {
    const trans = useTranslation();

    return (
        <section className="section is-paddingless ml-3 mr-3 mt-6">
            <div className="columns">
                <div className="column is-3 is-paddingless mr-6">
                    <h3 className="title is-6 mb-6">{trans('app.waterproof_section.title')}</h3>
                    <p className="subtitle is-6">{trans('app.waterproof_section.description')}</p>
                </div>
                <div className="column is-paddingless is- ml-7">
                    <figure className="image">
                        <img src="/water.png" alt="description"/>
                    </figure>
                </div>
            </div>
        </section>
    );
}

export default ImageAndDescription;