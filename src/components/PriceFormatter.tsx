import { SupportedLocale } from "@/src/types/Types";
import { useEffect, useState } from "react";
import { getFormattedPrice } from "@/src/utils/getFormattedPrice";
import { getCalculatedTax } from "@/src/utils/getCalculatedTax";

interface PriceFormatterProps {
    price: number;
    locale: SupportedLocale;
    calculateTax?: boolean;
}

const PriceFormatter = ({
    price,
    locale,
    calculateTax,
}: PriceFormatterProps) => {
    const [updatedPrice, setUpdatedPrice] = useState(
        getFormattedPrice(price, locale),
    );
    const [updatedPriceWithoutTax, setUpdatedPriceWithoutTax] = useState(
        getFormattedPrice(getCalculatedTax(price, locale), locale),
    );

    useEffect(() => {
        if (calculateTax) {
            setUpdatedPriceWithoutTax(
                getFormattedPrice(getCalculatedTax(price, locale), locale),
            );
        } else {
            setUpdatedPrice(getFormattedPrice(price, locale));
        }
    }, [price]);

    return <>{calculateTax ? updatedPriceWithoutTax : updatedPrice}</>;
};

export default PriceFormatter;
