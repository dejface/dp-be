import React from "react";
import PaginationWrapper from "@/src/components/pagination/PaginationWrapper";
import ShowMore from "@/src/components/ShowMore";
import { PiCaretDownThin } from "react-icons/pi";

interface ShowMorePaginationProps {
    onClick: (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => Promise<void>;
    text: string;
}

const ShowMorePagination = ({ onClick, text }: ShowMorePaginationProps) => {
    return (
        <PaginationWrapper>
            <ShowMore
                text={text}
                href={""}
                onClick={onClick}
                Icon={PiCaretDownThin}
            />
        </PaginationWrapper>
    );
};

export default ShowMorePagination;
