import { useEffect } from "react";
import { fetchProductInCartLocalizedInfo } from "@/src/api/fetch";
import { CartItem, SetCartItems } from "@/src/types/Cart";
import { SupportedLocale } from "@/src/types/Types";

const fetchAndUpdateItems = async (
    items: CartItem[],
    setItems: SetCartItems,
    locale: SupportedLocale,
) => {
    const itemIds = items.map((item) => item.id);
    if (itemIds.length > 0) {
        const fetchedInfo =
            (await fetchProductInCartLocalizedInfo(itemIds, locale)) ?? [];
        const updatedItems = items.map((item) => {
            const fetchedItem = fetchedInfo.find(
                (fetched) => fetched.sys.id === item.id,
            );
            if (fetchedItem) {
                return {
                    ...item,
                    title: fetchedItem.title,
                    price: fetchedItem.price,
                    slug: fetchedItem.slug,
                };
            }
            return item;
        });

        setItems(updatedItems);
    }
};

export const useFetchAndUpdateCartItems = (
    items: CartItem[],
    setItems: SetCartItems,
    locale: SupportedLocale,
) => {
    useEffect(() => {
        fetchAndUpdateItems(items, setItems, locale);
    }, [locale]);
};
