import React from "react";
import Layout from "@/src/components/Layout";
import { ShippingOption, SupportedLocale } from "@/src/types/Types";
import { fetchShippingOptions } from "@/src/api/fetch";
import ShippingPageLayout from "@/src/components/page/ShippingPageLayout";

interface ShippingIndexProps {
    shippingOptions: ShippingOption[];
}

const CheckoutIndex = ({ shippingOptions }: ShippingIndexProps) => {
    return (
        <Layout>
            <ShippingPageLayout shippingOptions={shippingOptions} />
        </Layout>
    );
};

export async function getStaticProps({ locale }: { locale: SupportedLocale }) {
    const fetchedItems = await fetchShippingOptions(locale);
    if (!fetchedItems) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            shippingOptions: fetchedItems,
        },
        revalidate: 30,
    };
}

export default CheckoutIndex;
