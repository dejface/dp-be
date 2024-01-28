import { useState, useEffect } from "react";

const usePageNumbers = (totalPages: number, currentPage: number): number[] => {
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);

    useEffect(() => {
        let numbers: number[] = [];
        let nextPage = currentPage + 1;
        let prevPage = currentPage - 1;

        if (totalPages < 4) {
            numbers = Array.from(Array(totalPages), (_, i) => i + 1);
            setPageNumbers(numbers);
            return;
        }

        if (currentPage === 1) {
            numbers = [currentPage, nextPage, -1, totalPages];
        } else if (currentPage === totalPages) {
            numbers = [1, -2, prevPage, currentPage];
        } else {
            const shouldShowDotsToFirstPage = prevPage - 2 >= 1;
            const shouldShowDotsToLastPage = nextPage + 2 <= totalPages;
            numbers = [
                ...(prevPage !== 1 ? [1] : []),
                ...(shouldShowDotsToFirstPage ? [-1] : []),
                prevPage,
                currentPage,
                nextPage,
                ...(shouldShowDotsToLastPage ? [-2] : []),
                ...(nextPage !== totalPages ? [totalPages] : []),
            ];
        }

        setPageNumbers(numbers);
    }, [currentPage]);

    return pageNumbers;
};

export default usePageNumbers;
