import React from "react";
import { fetchVoucherCollection } from "@/src/api/fetch";
import { Voucher } from "@/src/types/Types";
import CartPageLayout from "@/src/components/page/CartPageLayout";
import Layout from "@/src/components/Layout";
import { useShoppingCart } from "@/src/contexts/ShoppingCartContext";
import EmptyCart from "@/src/components/cart/EmptyCart";

interface CartIndexProps {
    voucherCodes: Voucher[];
}

const CartIndex = ({ voucherCodes }: CartIndexProps) => {
    const { items, setItems } = useShoppingCart();

    return (
        <Layout>
            {items.length > 0 ? (
                <CartPageLayout
                    voucherCodes={voucherCodes}
                    items={items}
                    setItems={setItems}
                />
            ) : (
                <EmptyCart />
            )}
        </Layout>
    );
};

export async function getStaticProps() {
    const fetchedItems = await fetchVoucherCollection();
    if (!fetchedItems) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            voucherCodes: fetchedItems,
        },
    };
}

export default CartIndex;
