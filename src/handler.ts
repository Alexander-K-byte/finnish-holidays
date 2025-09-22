import { DateTime } from "luxon";

type HolidayType = "public";

export interface Holiday {
    date: string;
    name: string;
    type: HolidayType;
}

/**
 * Formats date object to string using dd-MM-yyyy.
 */
const formatDate = (dt: DateTime): string => dt.toFormat("dd-MM-yyyy");

/**
 * Creates a list of fixed holiday dates and names
 */
const getFixedHolidays = (year: number): Holiday[] => {
    const fixed = [
        { day: 1, month: 1, name: "New Year's Day" },
        { day: 6, month: 1, name: "Epiphany" },
        { day: 1, month: 5, name: "May Day" },
        { day: 4, month: 11, name: "All Saints' Day" },
        { day: 6, month: 12, name: "Independence Day" },
        { day: 25, month: 12, name: "Christmas Day" },
        { day: 26, month: 12, name: "Boxing Day" },
    ];

    return fixed.map((f) => ({
        date: formatDate(DateTime.local(year, f.month, f.day)),
        name: f.name,
        type: "public",
    }));
};

/**
 * Using computus algorithm for calculating Easter Sunday for given year
 */
const getEasterSunday = (year: number): DateTime => {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const j = c % 4;
    const k = (32 + 2 * e + 2 * i - h - j) % 7;
    const l = Math.floor((a + 11 * h + 22 * k) / 451);
    const m = h + k - 7 * l + 114;
    const month = Math.floor(m / 31); // 1-based for Luxon
    const day = (m % 31) + 1;
    return DateTime.local(year, month, day);
};

/**
 * Easter-related holidays
 */
const getEasterHolidays = (year: number): Holiday[] => {
    const easter = getEasterSunday(year);

    return [
        {
            date: formatDate(easter.minus({ days: 2 })),
            name: "Good Friday",
            type: "public",
        },
        {
            date: formatDate(easter.plus({ days: 1 })),
            name: "Easter Monday",
            type: "public",
        },
        {
            date: formatDate(easter.plus({ days: 39 })),
            name: "Ascension Day",
            type: "public",
        },
        {
            date: formatDate(easter.plus({ days: 49 })),
            name: "Pentecost",
            type: "public",
        },
    ];
};

/**
 * Midsummer, first Saturday 20–26 June
 */
const getMidsummer = (year: number): Holiday => {
    const june20 = DateTime.local(year, 6, 20); // June 20
    const dayOfWeek = june20.weekday; // 1 = Monday, 7 = Sunday
    const daysToSaturday = (6 - dayOfWeek + 7) % 7;
    const midsummerDate = june20.plus({ days: daysToSaturday });

    return {
        date: formatDate(midsummerDate),
        name: "Midsummer Day",
        type: "public",
    };
};

export {
    type HolidayType,
    formatDate,
    getFixedHolidays,
    getEasterHolidays,
    getMidsummer,
};
