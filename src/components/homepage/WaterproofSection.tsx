import React from "react";
import { useTranslation } from "@/src/hooks/useTranslation";
import Image from "next/image";

const WaterproofSection = () => {
    const trans = useTranslation();

    return (
        <section className="section is-paddingless pl-3 pr-3 pt-6">
            <div className="columns is-vcentered">
                <div className="column is-full-mobile is-paddingless mr-6 pb-3-mobile px-1-mobile">
                    <h3 className="title is-6 pb-3">
                        {trans("app.waterproof_section.title")}
                    </h3>
                    <p className="subtitle is-6">
                        {trans("app.waterproof_section.description")}
                    </p>
                </div>
                <div className="column is-two-thirds is-paddingless is-full-mobile pl-3-desktop">
                    <figure className="image">
                        <Image
                            className={"waterproof__image"}
                            src={"/water.avif"}
                            alt={"Water avif"}
                            width={718}
                            height={180}
                        />
                    </figure>
                </div>
            </div>
        </section>
    );
};

export default WaterproofSection;
