import { CartItem } from "@/src/types/Cart";
import ProductLinkWithImage from "@/src/components/ProductLinkWithImage";
import QuantityChanger from "@/src/components/QuantityChanger";
import PriceFormatter from "@/src/components/PriceFormatter";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
import { SupportedLocale } from "@/src/types/Types";
import { useShoppingCart } from "@/src/contexts/ShoppingCartContext";

interface CartItemProps {
    item: CartItem;
    locale: SupportedLocale;
}

const CartItem = ({ item, locale }: CartItemProps) => {
    const { setItems, removeFromCart } = useShoppingCart();

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

    return (
        <div className="column is-full is-paddingless" key={item.id}>
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
                            setQuantity={(quantityUpdater) =>
                                setQuantity(item.id, quantityUpdater)
                            }
                        />
                    </div>
                    <div className="column is-flex is-justify-content-center has-text-weight-semibold product__title">
                        <PriceFormatter
                            price={item.price * item.quantity}
                            locale={locale}
                        />
                    </div>
                    <div className="column is-narrow mr-3">
                        <RiDeleteBin6Line
                            color={"gray"}
                            onClick={() => removeFromCart(item.id)}
                            className={"is-clickable"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
