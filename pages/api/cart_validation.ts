import { NextApiRequest, NextApiResponse } from "next";
import { fetchProductPreviews } from "@/src/api/fetch";
import { CartItem } from "@/src/types/Cart";
import { ProductPreview } from "@/src/types/Product";
import checkoutSessionsHandler from "./checkout_sessions";

export const config = {
    api: {
        externalResolver: true,
    },
};

type ResponseData = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    if (req.method === "POST") {
        const { items: cartItems, locale } = req.body;
        fetchProductPreviews(100, locale).then((data) => {
            if (data && data.data) {
                const products = data.data as ProductPreview[];
                const checks = cartItems.map((item: CartItem) => {
                    return products.find(
                        (product) => product.sys.id === item.id,
                    );
                });

                Promise.all(checks).then((results) => {
                    for (let i = 0; i < results.length; i++) {
                        if (
                            results[i] &&
                            results[i].price !== cartItems[i].price
                        ) {
                            return res.status(400).json({
                                message: "Price of some products has changed",
                            });
                        }
                    }
                    checkoutSessionsHandler(req, res);
                });
            }
        });
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
