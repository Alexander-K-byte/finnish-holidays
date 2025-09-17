import { addDays, format } from "date-fns"

export interface Holiday {
    date: string;
    name: string;
    type: "public" | "observance"
}

const formatDate = (d: Date): string => format(d, "dd-MM-yyyy");

const getFixedHolidays = (year: number): Holiday[] => {
    const fixed = [
        { day: 1, month: 0, name: "New Year's Day" },
        { day: 6, month: 0, name: "Epiphany" },
        { day: 1, month: 4, name: "May Day" },
        { day: 4, month: 10, name: "All Saints' day" },
        { day: 6, month: 11, name: "Independence day" },
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
 * computus algorithm for calculating Easter holidays
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
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // zero-indexed
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day);
};

const getGoodFriday = (year: number): Holiday => {
    const easter = getEasterSunday(year);
    const date = addDays(easter, - 2);
    return { date: formatDate(date), name: "Good Friday", type: "public" };
};

const getEasterMonday = (year: number): Holiday => {
    const easter = getEasterSunday(year);
    const date = addDays(easter, +1);
    return { date: formatDate(date), name: "Easter Monday", type: "public" };
};

/**
 * Ascension day is 40 days after easter Sunday
 */
const getAscensionDay = (year: number): Holiday => {
    const easter = getEasterSunday(year);
    const date = addDays(easter, +40);
    return { date: formatDate(date), name: "Ascension day", type: "public" };
};

/**
 * Pentecost is 10 days after Ascension day or 50 days after easter
 */
const getPentecost = (year: number): Holiday => {
    const easter = getEasterSunday(year);
    const date = addDays(easter, +50);
    return { date: formatDate(date), name: "Pentecost", type: "public" };
};

/**
 * Midsummer, first Saturday 20-26 June
 */
const getMidsummer = (year: number) => {
    const start = new Date(year, 5, 20);
    for (let i = 0; i <= 6; i++) {
        const a = addDays(start, i);
        if (a.getDay() === 6) {
            return { date: formatDate(a), name: "Midsummer", type: "public" }
        }
    }
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