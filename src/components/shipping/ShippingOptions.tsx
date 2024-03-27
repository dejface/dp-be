import React from "react";
import { ShippingOption } from "@/src/types/Types";
import PriceFormatter from "@/src/components/PriceFormatter";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";
import { useShoppingCart } from "@/src/contexts/ShoppingCartContext";

interface ShippingOptionsProps {
    shippingOptions: ShippingOption[];
    selectedOption: ShippingOption | null;
    onSelectOption: (option: ShippingOption) => void;
}

const ShippingOptions = ({
    shippingOptions,
    selectedOption,
    onSelectOption,
}: ShippingOptionsProps) => {
    const [locale] = useLanguage();
    const { hasFreeShipping } = useShoppingCart();
    const trans = useTranslation();
    return (
        <div className="box is-shadowless is-paddingless">
            <div className="shipping__title">
                {trans("app.cart.choose_shipping_method")}
            </div>
            {shippingOptions.map((option) => (
                <div
                    className="columns is-vcentered is-mobile mb-2"
                    key={option.sys.id}
                >
                    <div className="column is-narrow">
                        <input
                            id={option.sys.id}
                            type="radio"
                            name="shippingOption"
                            className="radio mt-2"
                            checked={
                                selectedOption
                                    ? selectedOption.sys.id === option.sys.id
                                    : false
                            }
                            onChange={() => onSelectOption(option)}
                        />
                    </div>
                    <div className="column shipping__type m-0">
                        {option.type}
                    </div>
                    <div className="column is-narrow shipping__price mb-0 mr-6 mr-0-mobile">
                        <PriceFormatter
                            price={hasFreeShipping ? 0 : option.price}
                            locale={locale}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShippingOptions;
