import {
    getFixedHolidays,
    getGoodFriday,
    getEasterMonday,
    getAscensionDay,
    getPentecost,
    getMidsummer,
    type Holiday
} from "./handler";

/**
 * Returns all Finnish public holidays for given year
 * includes fixed and shifting holidays, only return midsummer if defined
 * @param year Specific year you want holidays for 
 */
const getHolidays = (year: number): Holiday[] => {
    const midsummer = getMidsummer(year);

    return [
        ...getFixedHolidays(year),
        getGoodFriday(year),
        getEasterMonday(year),
        getAscensionDay(year),
        getPentecost(year),
        ...(midsummer ? [midsummer] : []),
    ];
};

export {
    type Holiday,
    getHolidays,
    getFixedHolidays,
    getGoodFriday,
    getEasterMonday,
    getAscensionDay,
    getPentecost,
    getMidsummer,
};
