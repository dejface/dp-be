import { ReactNode } from "react";

interface PaginationWrapperProps {
    children: ReactNode;
}

const PaginationWrapper = ({ children }: PaginationWrapperProps) => {
    return (
        <div className="columns is-centered">
            <div className="column is-full">
                <div className="level">
                    <div className="level-item has-text-centered">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginationWrapper;
