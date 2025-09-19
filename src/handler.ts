import { addDays, format } from "date-fns"

type HolidayType = "public";

export interface Holiday {
    date: string;
    name: string;
    type: HolidayType;
}


/**
 * Formats date object to string using dd-MM-yyyy.
 * @param d object to format
 */
const formatDate = (d: Date): string => format(d, "dd-MM-yyyy");

/**
 * Creates a list of fixed holiday dates and names
 * @param year Year to get holidays for
 */
const getFixedHolidays = (year: number): Holiday[] => {
    const fixed = [
        { day: 1, month: 0, name: "New Year's Day" },
        { day: 6, month: 0, name: "Epiphany" },
        { day: 1, month: 4, name: "May Day" },
        { day: 4, month: 10, name: "All Saints' Day" },
        { day: 6, month: 11, name: "Independence Day" },
        { day: 25, month: 11, name: "Christmas Day" },
        { day: 26, month: 11, name: "Boxing Day" }
    ];

    return fixed.map(f => ({
        date: formatDate(new Date(year, f.month, f.day)),
        name: f.name,
        type: "public"
    }));
};

/**
 * Using computus algorithm for calculating Easter Sunday for given year
 */
const getEasterSunday = (year: number): Date => {
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
    const month = Math.floor(m / 31) - 1; // zero-indexed
    const day = (m % 31) + 1;
    return new Date(year, month, day);
};

/**
 * Find easter related holidays based on date of Easter Sunday :
 * Good Friday, Easter Monday, Ascension Day, Pentecost.
 */
const getEasterHolidays = (year: number): Holiday[] => {
    const easter = getEasterSunday(year);

    const goodFriday: Holiday = {
        date: formatDate(addDays(easter, -2)),
        name: "Good Friday",
        type: "public"
    };

    const easterMonday: Holiday = {
        date: formatDate(addDays(easter, 1)),
        name: "Easter Monday",
        type: "public"
    };

    const ascensionDay: Holiday = {
        date: formatDate(addDays(easter, 39)),
        name: "Ascension Day",
        type: "public"
    };

    const pentecost: Holiday = {
        date: formatDate(addDays(easter, 49)),
        name: "Pentecost",
        type: "public"
    };

    return [goodFriday, easterMonday, ascensionDay, pentecost];
};

/**
 * Midsummer, first Saturday 20-26 June
 */
const getMidsummer = (year: number): Holiday => {
    const june20 = new Date(year, 5, 20); // June 20
    const dayOfWeek = june20.getDay();    // 0 = Sunday, 6 = Saturday
    const daysToSaturday = (6 - dayOfWeek + 7) % 7;
    const midsummerDate = addDays(june20, daysToSaturday);

    return { date: formatDate(midsummerDate), name: "Midsummer Day", type: "public" };
};


export {
    type HolidayType,
    formatDate,
    getFixedHolidays,
    getEasterHolidays,
    getMidsummer
};