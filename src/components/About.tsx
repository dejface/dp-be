import React from 'react';
import Image from "next/image";
import {useTranslation} from "@/src/hooks/useTranslation";

const About = () => {
    const trans = useTranslation();
    return (
        <div className="section is-paddingless pt-6 pb-6">
            <div className="columns is-paddingless">
                <div className="column">
                    <figure className="image is-paddingless">
                        <Image src={"/placeholder.png"} alt={"alt"} width={474} height={483} />
                    </figure>
                </div>
                <div className="column pt-2">
                    <h2 className="title">{trans('app.about.title')}</h2>
                    <p className={"is-italic"}>{trans('app.about.first_paragraph')}</p>
                    <br/>
                    <p className={"is-italic"}>{trans('app.about.second_paragraph')}</p>
                    <br/>
                    <p className={"is-italic"}>{trans('app.about.third_paragraph')}</p>
                    <br/>
                    <p className={"is-italic"}>{trans('app.about.fourth_paragraph')}</p>
                </div>
            </div>
        </div>
    );
}

export default About;