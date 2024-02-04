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

const ArticleSlugsContext = createContext<SlugState>(undefined as never);

export const ArticleSlugsWithLocaleProvider = ({
    children,
}: PropsWithChildren<{}>) => {
    const slugState = useState<SlugPair[]>([]);

    return (
        <ArticleSlugsContext.Provider value={slugState}>
            {children}
        </ArticleSlugsContext.Provider>
    );
};

export const useArticleSlugs = () => useContext(ArticleSlugsContext);
