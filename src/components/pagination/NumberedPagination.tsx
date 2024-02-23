import React from "react";
import Link from "next/link";
import usePageNumbers from "@/src/hooks/usePageNumbers";
import { useLanguage } from "@/src/hooks/useTranslation";
import { SupportedLocale } from "@/src/types/Types";
import { PAGINATION_PATH } from "@/src/utils/constants";
import PaginationWrapper from "@/src/components/pagination/PaginationWrapper";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    path: string;
}

const renderPageNumber = (
    number: number | string,
    currentPage: number,
    path: string,
    locale: SupportedLocale,
) => {
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
            href={number === 1 ? path : `${path}/${PAGINATION_PATH}/${number}`}
            key={number}
            className={"has-text-black mr-3"}
            locale={locale}
        >
            {number}
        </Link>
    );
};

const NumberedPagination = ({
    totalPages,
    currentPage,
    path,
}: PaginationProps) => {
    const pageNumbers = usePageNumbers(totalPages, currentPage);
    const [locale] = useLanguage();

    return (
        <PaginationWrapper>
            {pageNumbers.map((number) =>
                renderPageNumber(number, currentPage, path, locale),
            )}
        </PaginationWrapper>
    );
};

export default NumberedPagination;
