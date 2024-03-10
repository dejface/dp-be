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

type ShoppingCartState = [CartItem[], Dispatch<SetStateAction<CartItem[]>>];

const ShoppingCartContext = createContext<ShoppingCartState | undefined>(
    undefined,
);

export const ShoppingCartProvider = ({ children }: PropsWithChildren<{}>) => {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("shoppingCart");
        if (storedCart) {
            setItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(items));
    }, [items]);

    return (
        <ShoppingCartContext.Provider value={[items, setItems]}>
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
