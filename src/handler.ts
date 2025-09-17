import { addDays, format } from "date-fns"

export interface Holiday {
    date: string;
    name: string;
    type: "public" | "observance"
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
 * Find Good Friday based on date for Easter Sunday
 */
const getGoodFriday = (year: number): Holiday => {
    const easter = getEasterSunday(year);
    const date = addDays(easter, - 2);
    return { date: formatDate(date), name: "Good Friday", type: "public" };
};

/**
 * Find Easter Monday based on date for Easter Sunday
 */
const getEasterMonday = (year: number): Holiday => {
    const easter = getEasterSunday(year);
    const date = addDays(easter, +1);
    return { date: formatDate(date), name: "Easter Monday", type: "public" };
};

/**
 * Find Ascension Day based on date for Easter Sunday
 */
const getAscensionDay = (year: number): Holiday => {
    const easter = getEasterSunday(year);
    const date = addDays(easter, 39);
    return { date: formatDate(date), name: "Ascension Day", type: "public" };
};

/**
 * Find Pentecost based on date for Easter Sunday
 */
const getPentecost = (year: number): Holiday => {
    const easter = getEasterSunday(year);
    const date = addDays(easter, 49);
    return { date: formatDate(date), name: "Pentecost", type: "public" };
};

/**
 * Midsummer, first Saturday 20-26 June
 */
const getMidsummer = (year: number): Holiday | undefined => {
    const start = new Date(year, 5, 20); // June 20
    for (let i = 0; i <= 6; i++) {
        const d = addDays(start, i);
        if (d.getDay() === 6) {
            return { date: formatDate(d), name: "Midsummer Day", type: "public" };
        }
    }
    return undefined;
};


export {
    formatDate,
    getFixedHolidays,
    getEasterSunday,
    getEasterMonday,
    getGoodFriday,
    getAscensionDay,
    getPentecost,
    getMidsummer
};