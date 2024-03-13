import { useEffect } from "react";

const useOverflowStyle = () => {
    useEffect(() => {
        const originalOverflowX = document.documentElement.style.overflowX;
        const originalOverflowY = document.documentElement.style.overflowY;

        document.documentElement.style.overflowX = "visible";
        document.documentElement.style.overflowY = "visible";

        return () => {
            document.documentElement.style.overflowX = originalOverflowX;
            document.documentElement.style.overflowY = originalOverflowY;
        };
    }, []);
};

export default useOverflowStyle;
