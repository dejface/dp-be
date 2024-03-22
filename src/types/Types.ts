import { LOCALE_CS, LOCALE_SK } from "@/src/utils/constants";
import { ArticleContent, ArticlePreview } from "@/src/types/Article";
import { Product, ProductPreview } from "@/src/types/Product";

export type SupportedLocale = typeof LOCALE_CS | typeof LOCALE_SK;

export type TransformedData = {
    data: ArticlePreview[] | ProductPreview[];
    total: number;
};

export type Data = {
    data: ArticleContent | Product;
};

export type Voucher = {
    name: string;
    value: number;
    stripeId: string;
};

export type ShippingOption = {
    sys: {
        id: string;
    };
    type: string;
    price: number;
};

export type CheckoutStep = {
    translationKey:
        | "app.cart.full_name"
        | "app.cart.shipping_and_payment"
        | "app.cart.order_summary";
    isActive: boolean;
    isClickable: boolean;
    link: string;
};

export type FormData = {
    name: string;
    email: string;
    message: string;
    phone?: string;
};
