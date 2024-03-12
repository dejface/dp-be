import React, { useEffect } from "react";
import { useShoppingCart } from "@/src/contexts/ShoppingCartContext";
import QuantityChanger from "@/src/components/QuantityChanger";
import PriceFormatter from "@/src/components/PriceFormatter";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";
import Layout from "@/src/components/Layout";
import { useFetchAndUpdateCartItems } from "@/src/hooks/useFetchAndUpdateCartItems";
import ProductLinkWithImage from "@/src/components/ProductLinkWithImage";
import { getCalculatedTax } from "@/src/utils/getCalculatedTax";

const CartIndex = () => {
    const trans = useTranslation();
    const [locale] = useLanguage();
    const [items, setItems, total] = useShoppingCart();

    useFetchAndUpdateCartItems(items, setItems, locale);

    useEffect(() => {
        document.documentElement.classList.add("cart-page");

        return () => {
            document.documentElement.classList.remove("cart-page");
        };
    }, []);

    const setQuantity = (
        id: string,
        quantityUpdater: (quantity: number) => number,
    ): void => {
        setItems((currentItems) => {
            return currentItems.map((item) => {
                if (item.id === id) {
                    const newQuantity = quantityUpdater(item.quantity);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const totalPrice = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return (
        <Layout>
            <div className="container">
                <div className="columns">
                    <div className="column is-two-thirds">
                        <div className="columns is-multiline">
                            {items.map((item) => (
                                <div
                                    className="column is-full is-paddingless"
                                    key={item.id}
                                >
                                    <div className="box is-shadowless ml-1 mt-3 pb-0">
                                        <div className="columns is-vcentered">
                                            <div className="column is-narrow is-paddingless">
                                                <ProductLinkWithImage
                                                    categoryId={item.categoryId}
                                                    slug={item.slug}
                                                    image={item.image}
                                                    locale={locale}
                                                    className={"cart__image"}
                                                />
                                            </div>
                                            <div className="column ml-5 has-text-weight-semibold product__title">
                                                {item.title}
                                            </div>
                                            <div className="column field has-addons is-flex is-justify-content-center is-align-items-center mt-3">
                                                <QuantityChanger
                                                    quantity={item.quantity}
                                                    setQuantity={(
                                                        quantityUpdater,
                                                    ) =>
                                                        setQuantity(
                                                            item.id,
                                                            quantityUpdater,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="column is-flex is-justify-content-center has-text-weight-semibold product__title">
                                                <PriceFormatter
                                                    price={
                                                        item.price *
                                                        item.quantity
                                                    }
                                                    locale={locale}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="column is-one-third is-paddingless cart__price-container">
                        <div className="box is-shadowless cart__total-price is-justify-content-flex-start is-paddingless pt-6">
                            <div className="cart__price-with-tax is-flex is-justify-content-space-between">
                                <span className={"is-6 mr-2"}>
                                    {`${trans("app.total_price")}:`}
                                </span>
                                <span className={"has-text-weight-bold mr-3"}>
                                    <PriceFormatter
                                        price={totalPrice}
                                        locale={locale}
                                    />
                                </span>
                            </div>
                            <div className="cart__price-without-tax is-flex is-justify-content-space-between">
                                <span className={"is-6 mr-2"}>
                                    {`${trans("app.total_price_without_tax")}:`}
                                </span>
                                <span className={"has-text-weight-bold mr-3"}>
                                    <PriceFormatter
                                        price={getCalculatedTax(
                                            totalPrice,
                                            locale,
                                        )}
                                        locale={locale}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="cart__product-list-end-line" />
            </div>
        </Layout>
    );
};

export default CartIndex;
