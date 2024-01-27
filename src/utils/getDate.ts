import moment from "moment";

export const getDate = (date: string): string => {
    return moment(date).format("DD.MM.YYYY");
};
