import Image from "next/image";
import React from "react";

const Logo = () => {
    return (
        <div className={"column is-12 has-text-centered is-paddingless mb-5"}>
            <Image
                src={"/miloui_white.svg"}
                alt={"Miloui logo"}
                width={200}
                height={50}
            />
        </div>
    );
};

export default Logo;
