import { GetServerSideProps } from "next";
import Layout from "@/src/components/Layout";
import StripeSingleton from "@/src/utils/getStripeInstance";
import { GoCheckCircle } from "react-icons/go";
import React, { useEffect } from "react";
import { useTranslation } from "@/src/contexts/TransContext";
import CheckoutProcess from "@/src/components/cart/checkoutProccessIndication/CheckoutProcess";

interface OrderSummaryProps {
    email: string;
}

const OrderSummaryIndex = ({ email }: OrderSummaryProps) => {
    const trans = useTranslation();

    useEffect(() => {
        localStorage.removeItem("shoppingCart");
        localStorage.removeItem("voucherCode");
    }, []);

    return (
        <Layout>
            <div className={"px-1-mobile"}>
                <CheckoutProcess />
                <section className="section">
                    <div className="container has-text-centered">
                        <div className="columns is-vcentered is-centered">
                            <div className="column is-narrow">
                                <GoCheckCircle
                                    className={
                                        "order-summary__icon has-text-success mb-4"
                                    }
                                    data-testid={"order-icon"}
                                />
                                <p
                                    className={
                                        "order-summary__confirm-text mb-4"
                                    }
                                >
                                    {trans("app.order.success")}
                                </p>
                                <p className={"order-summary__thank-you-text"}>
                                    <span>{`${trans(
                                        "app.order.thank_you",
                                    )} ${email}.`}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const sessionId = context.query.session_id as string;
    const stripe = StripeSingleton.getInstance();
    const locale = context.locale;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return {
            props: {
                email: session.customer_details!.email as string,
            },
        };
    } catch (err) {
        return {
            redirect: {
                destination: `/${locale ?? ""}`,
                permanent: false,
            },
        };
    }
};

export default OrderSummaryIndex;
