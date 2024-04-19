import { INFO_MAIL } from "@/src/utils/constants";
import React from "react";
import { useTranslation } from "@/src/contexts/TransContext";
import Image from "next/image";

const Info = () => {
    const trans = useTranslation();
    return (
        <div className="column">
            <p className="is-italic">{trans("app.footer.info_text")}</p>
            <br />
            <p className="has-text-weight-bold">{INFO_MAIL}</p>
            <p className="is-hidden-mobile is-flex is-justify-content-flex-end">
                <Image
                    src={"/stars.svg"}
                    alt={"stars"}
                    width={80}
                    height={20}
                    className={"footer__stars"}
                />
            </p>
        </div>
    );
};

export default Info;
