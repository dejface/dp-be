import React, { ReactNode } from "react";
import Layout from "./Layout";
import Pagination from "./Pagination";

interface PageLayoutProps {
    itemComponent: ReactNode;
    totalPages: string;
    currentPage: string;
    paginationPath: string;
}

const PaginatedPageLayout = ({ ...props }: PageLayoutProps) => {
    return (
        <Layout>
            <div className="columns is-multiline mt-2 is-variable is-2">
                {props.itemComponent}
            </div>
            <Pagination
                totalPages={props.totalPages}
                currentPage={props.currentPage}
                path={props.paginationPath}
            />
        </Layout>
    );
};

export default PaginatedPageLayout;
