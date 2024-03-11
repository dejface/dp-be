import {
    createContext,
    useState,
    useContext,
    useEffect,
    Dispatch,
    SetStateAction,
    PropsWithChildren,
} from "react";

interface CartItem {
    id: string;
    quantity: number;
}

type ShoppingCartState = [
    CartItem[],
    Dispatch<SetStateAction<CartItem[]>>,
    number,
];

const ShoppingCartContext = createContext<ShoppingCartState | undefined>(
    undefined,
);

export const ShoppingCartProvider = ({ children }: PropsWithChildren<{}>) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const storedCart = localStorage.getItem("shoppingCart");
        if (storedCart) {
            setItems(JSON.parse(storedCart));
        }
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

        window.addEventListener("storage", updateTotalItems);

        updateTotalItems();

        return () => {
            window.removeEventListener("storage", updateTotalItems);
        };
    }, []);

    return (
        <ShoppingCartContext.Provider value={[items, setItems, totalItems]}>
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
