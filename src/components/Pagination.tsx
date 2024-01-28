import React from "react";
import Link from "next/link";
import { BLOG_PATH } from "@/src/utils/constants";
import usePageNumbers from "@/src/hooks/usePageNumbers";

interface PaginationProps {
    totalPages: string;
    currentPage: string;
}

const renderPageNumber = (number: number | string, currentPage: number) => {
    if (number === -1 || number === -2) {
        return (
            <span key={number} className={"mr-3"}>
                ...
            </span>
        );
    }

    if (number === currentPage) {
        return (
            <span key={number} className={"has-text-black mr-3"}>
                {number}
            </span>
        );
    }

    return (
        <Link
            href={number === 1 ? BLOG_PATH : `${BLOG_PATH}/page/${number}`}
            key={number}
            className={"has-text-black mr-3"}
        >
            {number}
        </Link>
    );
};

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
    const pageNumbers = usePageNumbers(
        parseInt(totalPages),
        parseInt(currentPage),
    );

    return (
        <div className="columns is-centered">
            <div className="column is-full">
                <div className="level">
                    <div className="level-item has-text-centered">
                        {pageNumbers.map((number) =>
                            renderPageNumber(number, parseInt(currentPage)),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
