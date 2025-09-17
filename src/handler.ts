import { format, formatDate } from "date-fns"

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
        { day: 6, month: 11, name: "Independence day" },
        { day: 25, month: 11, name: "Christmas Day" },
        { day: 26, month: 11, name: "Boxing Day" }
    ];

    return fixed.map(f => ({
        date: formatDate(new Date(year, f.month, f.day)),
        name: f.name,
        type: "public",
    }));
};

export { formatDate, getFixedHolidays }