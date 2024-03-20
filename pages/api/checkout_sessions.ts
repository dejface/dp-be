import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartItem } from "@/src/types/Cart";
import { getCurrencies } from "@/src/utils/getFormattedPrice";
import StripeSingleton from "@/src/utils/getStripeInstance";
import { CART_PATH } from "@/src/utils/constants";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        const stripe = StripeSingleton.getInstance();
        const { items: cartItems, locale, discountId } = req.body;
        const currency = getCurrencies(locale).toLowerCase();

        let sessionData: Stripe.Checkout.SessionCreateParams = {
            billing_address_collection: "auto",
            shipping_address_collection: {
                allowed_countries: ["CZ", "SK"],
            },
            line_items: cartItems.map((item: CartItem) => ({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.title,
                        images: [item.image.url],
                    },
                    unit_amount: Math.floor(item.price * 100),
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/${CART_PATH}?canceled=true`,
            automatic_tax: { enabled: true },
            locale: locale,
        };

        if (discountId !== "") {
            sessionData.discounts = [{ coupon: discountId }];
        }

        try {
            const session = await stripe.checkout.sessions.create(sessionData);
            res.json({ url: session.url });
        } catch (err) {
            const error = err as { statusCode?: number; message: string };
            res.status(error.statusCode || 500).json(error.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
