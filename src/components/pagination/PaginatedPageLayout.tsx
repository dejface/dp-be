import React, { ReactNode } from "react";

interface PageLayoutProps {
    itemComponent: ReactNode;
    paginationComponent: ReactNode;
}

const PaginatedPageLayout = ({ ...props }: PageLayoutProps) => {
    return (
        <>
            <div className="columns is-multiline mt-2 is-variable is-2">
                {props.itemComponent}
            </div>
            {props.paginationComponent}
        </>
    );
};

export default PaginatedPageLayout;
