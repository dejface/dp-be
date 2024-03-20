import CartPriceSummary from "@/src/components/cart/CartPriceSummary";
import DeliveryNotice from "@/src/components/cart/DeliveryNotice";
import FreeShippingProgressBar from "@/src/components/cart/FreeShippingProgressBar";
import VoucherInput from "@/src/components/cart/VoucherInput";
import React, { useState } from "react";
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
import Link from "next/link";
import PopupModal from "@/src/components/PopupModal";
import { CgDanger } from "react-icons/cg";

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
    const [discount, setDiscount] = useState(0);
    const storedVoucherCode = localStorage.getItem("voucherCode") ?? "";
    const { handleVoucherSubmit, isModalOpen, setIsModalOpen } = useVoucher(
        voucherCodes,
        setDiscount,
        storedVoucherCode,
    );
    const router = useRouter();

    useFetchAndUpdateCartItems(items, setItems, locale);
    useOverflowStyle();
    const { totalPriceWithoutDiscount, totalPriceWithDiscount } =
        useCalculatePrices(items, discount);

    return (
        <div className="container">
            <CheckoutProcess />
            <div className="columns">
                <div className="column is-two-thirds">
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
                <div className="column is-one-third is-paddingless cart__price-container">
                    <div className={"is-align-self-stretch"}>
                        <CartPriceSummary
                            totalPrice={totalPriceWithDiscount}
                            locale={locale}
                        />
                    </div>
                    <div className={"is-align-self-flex-end mt-6"}>
                        <Link
                            className="confirm-button has-full-width"
                            href={""}
                        >
                            {trans("app.continue")}
                        </Link>
                    </div>
                </div>
            </div>
            <hr className="cart__product-list-end-line" />
            <div className="columns">
                <div className="column is-three-quarters">
                    <div className="columns">
                        <div className="column is-half is-flex is-justify-content-flex-start">
                            <DeliveryNotice />
                        </div>
                        <div className="column is-half is-flex is-justify-content-flex-end">
                            <FreeShippingProgressBar
                                totalPrice={totalPriceWithoutDiscount}
                                locale={locale}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={"columns"}>
                <div className={"column is-one-third"}>
                    <VoucherInput
                        onSubmit={handleVoucherSubmit}
                        onClear={() => setDiscount(0)}
                        isModalOpen={isModalOpen}
                    />
                </div>
            </div>
            <div className="is-flex is-justify-content-flex-start">
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
