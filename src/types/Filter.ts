export type FilterProductsCriteria = {
    type: string;
    id: string;
    name: string;
};

export type FilterOptions = {
    [key: string]: FilterProductsCriteria;
};
