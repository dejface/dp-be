import React from "react";
import { useTranslation } from "@/src/hooks/useTranslation";

const ImageAndDescription = () => {
    const trans = useTranslation();

    return (
        <section className="section is-paddingless pl-3 pr-3 pt-6">
            <div className="columns">
                <div className="column is-3 is-paddingless pr-6">
                    <h3 className="title is-6 pb-6">
                        {trans("app.waterproof_section.title")}
                    </h3>
                    <p className="subtitle is-6">
                        {trans("app.waterproof_section.description")}
                    </p>
                </div>
                <div className="column is-paddingless pl-6">
                    <figure className="image">
                        <img src="/water.png" alt="description" />
                    </figure>
                </div>
            </div>
        </section>
    );
};

export default ImageAndDescription;
