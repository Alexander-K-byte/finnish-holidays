import {
    getFixedHolidays,
    getGoodFriday,
    getEasterMonday,
    getAscensionDay,
    getPentecost,
    getMidsummer,
    type Holiday
} from "./handler";

const getHolidays = (year: number): Holiday[] => [
    ...getFixedHolidays(year),
    getGoodFriday(year),
    getEasterMonday(year),
    getAscensionDay(year),
    getPentecost(year),
    getMidsummer(year),
];

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
