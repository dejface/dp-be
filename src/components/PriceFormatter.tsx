import { SupportedLocale } from "@/src/types/Types";
import { useEffect, useState } from "react";
import { getFormattedPrice } from "@/src/utils/getFormattedPrice";

interface PriceFormatterProps {
    price: number;
    locale: SupportedLocale;
}

const PriceFormatter = ({ price, locale }: PriceFormatterProps) => {
    const [updatedPrice, setUpdatedPrice] = useState(
        getFormattedPrice(price, locale),
    );

    useEffect(() => {
        setUpdatedPrice(getFormattedPrice(price, locale));
    }, [price]);

    return <>{updatedPrice}</>;
};

export default PriceFormatter;
