import { describe, it, expect } from "vitest";
import { getHolidays, type Holiday } from "../src/index";
import { formatDate } from "../src/handler"

// Years to test, including leap years and typical years
const testYears = [2024, 2025, 2026];

testYears.forEach(year => {
    describe(`Finnish Holidays for ${year}`, () => {

        it("should include Independence Day", () => {
            const holidays: Holiday[] = getHolidays(year);
            expect(holidays).toContainEqual({
                date: formatDate(new Date(year, 11, 6)), // December 6
                name: "Independence Day",
                type: "public",
            });
        });

        it("should include all fixed-date public holidays", () => {
            const holidays: Holiday[] = getHolidays(year);
            const fixedNames = [
                "New Year's Day",
                "Epiphany",
                "May Day",
                "All Saints' Day",
                "Independence Day",
                "Christmas Day",
                "Boxing Day",
            ];

            const fixedHolidays = holidays.filter(
                (h): h is Holiday => fixedNames.includes(h.name)
            );
            expect(fixedHolidays.length).toBe(fixedNames.length);
        });

        it("should include all calculated moving holidays", () => {
            const holidays: Holiday[] = getHolidays(year);
            const movingNames = [
                "Good Friday",
                "Easter Monday",
                "Ascension Day",
                "Pentecost",
                "Midsummer Day",
            ];

            movingNames.forEach(name => {
                const holiday = holidays.find(h => h.name === name);
                expect(holiday).toBeDefined();
                expect(holiday?.type).toBe("public");
            });
        });

        it("should match the full holiday list snapshot", () => {
            const holidays: Holiday[] = getHolidays(year);
            expect(holidays).toMatchSnapshot();
        });
    });
});
