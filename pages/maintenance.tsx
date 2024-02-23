import React from "react";
import Image from "next/image";

const Maintenance = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Image
                src="/miloui.png"
                width={102}
                height={37}
                alt="Miloui Logo"
            />
            <h6>Under Construction</h6>
        </div>
    );
};

export default Maintenance;
