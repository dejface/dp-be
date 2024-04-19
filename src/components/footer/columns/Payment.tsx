import Image from "next/image";
import React from "react";
import { useTranslation } from "@/src/contexts/TransContext";

const Payment = () => {
    const trans = useTranslation();
    return (
        <div className="column">
            <p className="has-text-weight-bold ml-1">
                {trans("app.footer.afraid_of_us").toUpperCase()}
            </p>
            <p>
                <Image
                    src="/stripe.svg"
                    width={64}
                    height={32}
                    alt="stripe"
                    className="mt-1"
                />
                <Image
                    src="/visa.svg"
                    width={40}
                    height={13}
                    alt="visa"
                    className="mb-2"
                />
            </p>
            <p>
                <Image
                    src="/mastercard.svg"
                    width={29}
                    height={20}
                    alt="mastercard"
                    className="ml-2"
                />
                <Image
                    src="/3ds.svg"
                    width={38}
                    height={20}
                    alt="3ds"
                    className="ml-2"
                />
            </p>
        </div>
    );
};

export default Payment;
