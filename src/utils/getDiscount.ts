export const getDiscount = (price: number, discount: number) => {
    const discountValue = discount > 0 ? discount / 100 : 0;
    return price - price * discountValue;
};
