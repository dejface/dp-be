import {
    createContext,
    useState,
    useContext,
    useEffect,
    PropsWithChildren,
} from "react";
import { CartItem, SetCartItems } from "@/src/types/Cart";
import { Voucher } from "@/src/types/Types";
import { getEmptyVoucher } from "@/src/utils/getEmptyVoucher";

type ShoppingCartState = {
    items: CartItem[];
    setItems: SetCartItems;
    totalItems: number;
    removeFromCart: (id: string) => void;
    voucher: Voucher;
    setVoucher: (voucher: Voucher) => void;
    hasFreeShipping: boolean;
    setHasFreeShipping: (hasFreeShipping: boolean) => void;
};

const ShoppingCartContext = createContext<ShoppingCartState | undefined>(
    undefined,
);

export const ShoppingCartProvider = ({ children }: PropsWithChildren<{}>) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [voucher, setVoucher] = useState<Voucher>(getEmptyVoucher());
    const [hasFreeShipping, setHasFreeShipping] = useState(false);

    useEffect(() => {
        const updateItems = () => {
            const storedItems = localStorage.getItem("shoppingCart");
            const items = storedItems ? JSON.parse(storedItems) : [];
            setItems(items);
        };

        updateItems();
        window.addEventListener("storage", updateItems);

        return () => {
            window.removeEventListener("storage", updateItems);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(items));
        const newTotalItems = items.reduce(
            (total, item) => total + item.quantity,
            0,
        );
        localStorage.setItem("totalItems", String(newTotalItems));
        setTotalItems(newTotalItems);
    }, [items]);

    useEffect(() => {
        const updateTotalItems = () => {
            const storedCount = localStorage.getItem("totalItems");
            const count = storedCount ? Number(storedCount) : 0;
            setTotalItems(count);
        };

        updateTotalItems();
        window.addEventListener("storage", updateTotalItems);

        return () => {
            window.removeEventListener("storage", updateTotalItems);
        };
    }, []);

    const removeFromCart = (id: string) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                items,
                setItems,
                totalItems,
                removeFromCart,
                voucher,
                setVoucher,
                hasFreeShipping,
                setHasFreeShipping,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};

export const useShoppingCart = (): ShoppingCartState => {
    const context = useContext(ShoppingCartContext);
    if (!context)
        throw new Error(
            "useShoppingCart must be used within a ShoppingCartProvider",
        );
    return context;
};
