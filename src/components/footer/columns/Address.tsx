import React from "react";
import { useTranslation } from "@/src/contexts/TransContext";

const Address = () => {
    const trans = useTranslation();
    return (
        <div className="column">
            <div className="footer__address">
                <p className="has-text-weight-bold">CREONATION s.r.o.</p>
                <p>Adresa sídla:</p>
                <p>Mládeže 373/79</p>
                <p>013 41, Dolný Hričov</p>
                <p>IČO: 53988281</p>
                <p>DIČ: 2121541081</p>
            </div>
            <br />
            <div className="footer__return-address">
                <p className="has-text-weight-bold">
                    {trans("app.footer.return_address").toUpperCase()}
                </p>
                <p>Miloui.cz Olicon Logistic s.r.o.</p>
                <p>Trabantská 692</p>
                <p>190 15 Praha-Satalice</p>
            </div>
        </div>
    );
};

export default Address;
