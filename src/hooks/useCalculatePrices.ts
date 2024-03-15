import { getDiscount } from "@/src/utils/getDiscount";
import { CartItem } from "@/src/types/Cart";

const useCalculatePrices = (items: CartItem[], discount: number) => {
    const totalPriceWithoutDiscount = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    const totalPriceWithDiscount = items.reduce((acc, item) => {
        const discountedPrice = getDiscount(item.price, discount);
        return acc + discountedPrice * item.quantity;
    }, 0);

    return { totalPriceWithoutDiscount, totalPriceWithDiscount };
};

export default useCalculatePrices;
