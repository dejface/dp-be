import React, { ReactNode } from "react";

interface PageLayoutProps {
    itemComponent: ReactNode;
    paginationComponent: ReactNode;
}

const PaginatedPageLayout = ({ ...props }: PageLayoutProps) => {
    return (
        <div className="pagination-wrapper">
            <div className="columns is-multiline mt-2 is-variable is-2 px-1-mobile is-mobile">
                {props.itemComponent}
            </div>
            {props.paginationComponent}
        </div>
    );
};

export default PaginatedPageLayout;
