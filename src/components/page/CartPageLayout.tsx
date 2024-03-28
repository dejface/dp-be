import FreeShippingProgressBar from "@/src/components/cart/FreeShippingProgressBar";
import VoucherInput from "@/src/components/cart/VoucherInput";
import React, { useEffect, useMemo } from "react";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";
import { useFetchAndUpdateCartItems } from "@/src/hooks/useFetchAndUpdateCartItems";
import { Voucher } from "@/src/types/Types";
import CartItem from "@/src/components/cart/CartItem";
import { SetCartItems } from "@/src/types/Cart";
import ShowMore from "@/src/components/ShowMore";
import { PiCaretLeftThin } from "react-icons/pi";
import { useRouter } from "next/router";
import { useVoucher } from "@/src/hooks/useVoucher";
import useOverflowStyle from "@/src/hooks/useOverflowStyle";
import useCalculatePrices from "@/src/hooks/useCalculatePrices";
import CheckoutProcess from "@/src/components/cart/checkoutProccessIndication/CheckoutProcess";
import PopupModal from "@/src/components/PopupModal";
import { CgDanger } from "react-icons/cg";
import { useShoppingCart } from "@/src/contexts/ShoppingCartContext";
import { getEmptyVoucher } from "@/src/utils/getEmptyVoucher";
import useDeviceSize from "@/src/hooks/useDeviceSize";
import CartPriceContainer from "@/src/components/cart/cartPrice/CartPriceContainer";
import { MOBILE_BREAKPOINT } from "@/src/utils/constants";

interface CartPageLayoutProps {
    items: CartItem[];
    setItems: SetCartItems;
    voucherCodes: Voucher[];
}

const CartPageLayout = ({
    voucherCodes,
    items,
    setItems,
}: CartPageLayoutProps) => {
    const trans = useTranslation();
    const [locale] = useLanguage();
    const { voucher, setVoucher } = useShoppingCart();
    const router = useRouter();
    const [width] = useDeviceSize();

    useEffect(() => {
        const voucherName = localStorage.getItem("voucherCode");
        setVoucher(
            voucherCodes.find((v) => v.name === voucherName) ??
                getEmptyVoucher(),
        );
    }, [voucherCodes]);

    const { handleVoucherSubmit, isModalOpen, setIsModalOpen } = useVoucher(
        voucherCodes,
        setVoucher,
    );

    useFetchAndUpdateCartItems(items, setItems, locale);
    useOverflowStyle();
    const { totalPriceWithoutDiscount, totalPriceWithDiscount } =
        useCalculatePrices(items, voucher.value);

    const cartPriceContainer = useMemo(
        () => (
            <CartPriceContainer
                totalPriceWithDiscount={totalPriceWithDiscount}
                locale={locale}
                label={trans("app.continue")}
            />
        ),
        [locale, totalPriceWithDiscount],
    );

    return (
        <div className="cart__container px-1-mobile">
            <CheckoutProcess />
            <div className="columns">
                <div className="column is-two-thirds-desktop is-full-mobile is-three-quarters-tablet">
                    <div className="columns is-multiline">
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                locale={locale}
                            />
                        ))}
                    </div>
                </div>
                {width > MOBILE_BREAKPOINT && cartPriceContainer}
            </div>
            <hr className="cart__product-list-end-line" />
            <div className="columns mb-0-mobile">
                <div className="column is-three-quarters">
                    <div className="columns is-mobile">
                        <div className="column is-half is-flex is-justify-content-flex-start">
                            <VoucherInput
                                onSubmit={handleVoucherSubmit}
                                onClear={setVoucher}
                                isModalOpen={isModalOpen}
                            />
                        </div>
                        <div className="cart__shipping-progress-column column is-half">
                            <FreeShippingProgressBar
                                totalPrice={totalPriceWithoutDiscount}
                                locale={locale}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {width <= MOBILE_BREAKPOINT && cartPriceContainer}
            <div className="cart__back-button is-flex is-justify-content-flex-start">
                <ShowMore
                    text={trans("app.cart.back_to_shop")}
                    href={""}
                    Icon={PiCaretLeftThin}
                    iconPosition={"left"}
                    onClick={async (e) => {
                        e.preventDefault();
                        router.back();
                    }}
                />
            </div>
            {isModalOpen && (
                <PopupModal
                    setIsModalOpen={setIsModalOpen}
                    Icon={CgDanger}
                    text={trans("app.cart.voucher_denied")}
                    iconColor={"has-text-danger"}
                />
            )}
        </div>
    );
};

export default CartPageLayout;
