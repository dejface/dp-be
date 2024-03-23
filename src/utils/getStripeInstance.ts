import Stripe from "stripe";

class StripeSingleton {
    private static instance: Stripe;

    public static getInstance(): Stripe {
        if (!StripeSingleton.instance) {
            const secretKey =
                process.env.VERCEL_ENV === "production"
                    ? String(process.env.STRIPE_SECRET)
                    : String(process.env.STRIPE_SECRET_TEST);

            StripeSingleton.instance = new Stripe(String(secretKey), {
                apiVersion: "2023-10-16",
            });
        }
        return StripeSingleton.instance;
    }
}

export default StripeSingleton;
