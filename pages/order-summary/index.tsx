import { GetServerSideProps } from "next";
import Layout from "@/src/components/Layout";
import StripeSingleton from "@/src/utils/getStripeInstance";
import { GoCheckCircle } from "react-icons/go";
import React from "react";
import { useTranslation } from "@/src/contexts/TransContext";

interface OrderSummaryProps {
    customerName: string;
    email: string;
}

const OrderSummaryIndex = ({ customerName, email }: OrderSummaryProps) => {
    const trans = useTranslation();

    return (
        <Layout>
            <section className="section">
                <div className="container has-text-centered">
                    <div className="columns is-vcentered is-centered">
                        <div className="column is-narrow">
                            <GoCheckCircle
                                className={
                                    "order-summary__icon has-text-success"
                                }
                                data-testid={"order-icon"}
                            />
                            <p className={"order-summary__text"}>
                                {trans("app.order.success")}
                            </p>
                            <p className={""}>
                                {`Dakujeme za vasu objednavku. Sumar objednavky bude zaslaný na váš email uvedeny pri platbe (${email}).`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const sessionId = context.query.session_id as string;
    const stripe = StripeSingleton.getInstance();
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return {
            props: {
                customerName: session.customer_details!.name as string,
                email: session.customer_details!.email as string,
            },
        };
    } catch (err) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};

export default OrderSummaryIndex;
