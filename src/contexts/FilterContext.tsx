import {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
    PropsWithChildren,
} from "react";
import { FilterProductsCriteria } from "@/src/types/Filter";

type FilterState = [
    FilterProductsCriteria | null,
    Dispatch<SetStateAction<FilterProductsCriteria | null>>,
];

const FilterContext = createContext<FilterState>(undefined as never);

export const FilterProvider = ({ children }: PropsWithChildren<{}>) => {
    const filterState = useState<FilterProductsCriteria | null>(null);

    return (
        <FilterContext.Provider value={filterState}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const filter = useContext(FilterContext);
    if (filter === null) throw new Error("FilterContext was not initialized.");
    return filter;
};
