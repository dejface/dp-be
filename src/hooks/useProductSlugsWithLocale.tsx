import {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
    PropsWithChildren,
} from "react";
import { SlugPair } from "@/src/types/Types";

type SlugState = [SlugPair[], Dispatch<SetStateAction<SlugPair[]>>];

const ProductSlugsContext = createContext<SlugState>(undefined as never);

export const ProductSlugsWithLocaleProvider = ({
    children,
}: PropsWithChildren<{}>) => {
    const slugState = useState<SlugPair[]>([]);

    return (
        <ProductSlugsContext.Provider value={slugState}>
            {children}
        </ProductSlugsContext.Provider>
    );
};

export const useProductSlugs = () => useContext(ProductSlugsContext);
