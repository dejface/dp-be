import React from "react";
import { useTranslation } from "@/src/hooks/useTranslation";
import Image from "next/image";

const WaterproofSection = () => {
    const trans = useTranslation();

    return (
        <section className="section is-paddingless pl-3 pr-3 pt-6">
            <div className="columns is-vcentered">
                <div className="column is-one-quarter-desktop is-full-mobile is-paddingless pb-3-mobile px-1-mobile">
                    <h3 className="title is-6 pb-3">
                        {trans("app.waterproof_section.title")}
                    </h3>
                    <p className="subtitle is-6">
                        {trans("app.waterproof_section.description")}
                    </p>
                </div>
                <div className="column is-paddingless is-full-mobile pl-3-desktop">
                    <figure className="image is-3by1">
                        <Image
                            src={"/water-gif.gif"}
                            alt={"Water gif"}
                            width={100}
                            height={50}
                        />
                    </figure>
                </div>
            </div>
        </section>
    );
};

export default WaterproofSection;
