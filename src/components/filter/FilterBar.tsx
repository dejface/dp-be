import React from "react";
import classNames from "classnames";

interface FilterProps {
    filters: string[];
    onFilterSelect: (filter: string) => void;
    activeFilter: string | undefined;
}

const FilterBar = ({ filters, onFilterSelect, activeFilter }: FilterProps) => {
    const handleFilterClick = (filterName: string) => {
        if (filterName === activeFilter) {
            onFilterSelect("");
        } else {
            onFilterSelect(filterName);
        }
    };

    return (
        <div className="buttons filterButton__buttons has-addons pt-2 px-1-mobile">
            {filters.map((filterName) => (
                <button
                    key={filterName}
                    className={classNames("filterButton", {
                        filterButton__active: filterName === activeFilter,
                    })}
                    onClick={() => handleFilterClick(filterName)}
                >
                    {filterName}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
