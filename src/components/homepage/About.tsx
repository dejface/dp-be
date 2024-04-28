import React from "react";
import Image from "next/image";
import { useTranslation } from "@/src/contexts/TransContext";
import aboutPhoto from "public/about-photo.png";

const About = () => {
    const trans = useTranslation();
    return (
        <div className="section is-paddingless pt-6 pb-6 px-1-mobile pt-3-mobile">
            <div className="columns">
                <div className="column is-three-fifths about__text-column">
                    <h2 className="about__title mb-4">
                        {trans("app.about.title")}
                    </h2>
                    <div className="about__paragraphs">
                        <p className={"is-italic"}>
                            {trans("app.about.first_paragraph")}
                        </p>
                        <br />
                        <p className={"is-italic"}>
                            {trans("app.about.second_paragraph")}
                        </p>
                        <br />
                        <p className={"is-italic"}>
                            {trans("app.about.third_paragraph")}
                        </p>
                        <br />
                        <p className={"is-italic"}>
                            {trans("app.about.fourth_paragraph")}
                        </p>
                    </div>
                </div>
                <div className="column is-two-fifths about__image-column">
                    <Image
                        className={"about__image"}
                        src={aboutPhoto}
                        alt={"alt"}
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default About;
