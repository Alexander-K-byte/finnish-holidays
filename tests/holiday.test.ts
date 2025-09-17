import { describe, it, expect } from "vitest";
import { getHolidays, type Holiday } from "../src/index";

describe("Finnish Holidays", () => {
    it("should include Independence Day (06-12) for 2025", () => {
        const holidays: Holiday[] = getHolidays(2025);
        expect(holidays).toContainEqual({
            date: "06-12-2025",
            name: "Independence Day",
            type: "public",
        });
    });

    it("should include all calculated moving holidays", () => {
        const holidays: Holiday[] = getHolidays(2025);

        const expectedHolidays = [
            { date: "18-04-2025", name: "Good Friday" },
            { date: "21-04-2025", name: "Easter Monday" },
            { date: "29-05-2025", name: "Ascension Day" },
            { date: "08-06-2025", name: "Pentecost" },
            { date: "21-06-2025", name: "Midsummer Day" },
        ];

        expectedHolidays.forEach(h => {
            expect(holidays).toContainEqual({ ...h, type: "public" });
        });
    });

    it("should return the correct number of fixed holidays for 2025", () => {
        const holidays: Holiday[] = getHolidays(2025);

        // TypeScript-safe filter
        const fixedHolidays = holidays.filter(
            (h): h is Holiday =>
                [
                    "New Year's Day",
                    "Epiphany",
                    "May Day",
                    "All Saints' Day",
                    "Independence Day",
                    "Christmas Day",
                    "Boxing Day",
                ].includes(h.name)
        );

        expect(fixedHolidays.length).toBe(7);
    });
});
