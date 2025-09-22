import {
    formatDate,
    getFixedHolidays,
    getEasterHolidays,
    getMidsummer,
    type Holiday
} from "./handler";

/**
 * Returns all Finnish public holidays for a given year.
 * Includes fixed holidays, Easter-related holidays, and Midsummer.
 * @param year Year to get holidays for
 */
const getHolidays = (year: number): Holiday[] => {
    return [
        ...getFixedHolidays(year),
        ...getEasterHolidays(year),
        getMidsummer(year)
    ];
};

export {
    type Holiday,
    getHolidays,
    getFixedHolidays,
    getEasterHolidays,
    getMidsummer,
    formatDate
};
