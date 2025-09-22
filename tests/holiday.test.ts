import { describe, it, expect, beforeAll } from "vitest";
import { getHolidays, type Holiday } from "../src/index";
import { DateTime } from "luxon";

const testYears = [2024, 2025, 2026, 2032]; // include leap year

describe("Finnish Holidays Library", () => {
    testYears.forEach(year => {
        describe(`Year ${year}`, () => {

            let holidays: Holiday[];

            beforeAll(() => {
                holidays = getHolidays(year);
            });

            it("includes all fixed-date public holidays", () => {
                const fixedNames = [
                    "New Year's Day",
                    "Epiphany",
                    "May Day",
                    "All Saints' Day",
                    "Independence Day",
                    "Christmas Day",
                    "Boxing Day",
                ];
                fixedNames.forEach(name => {
                    const holiday = holidays.find(h => h.name === name);
                    expect(holiday).toBeDefined();
                    expect(holiday?.type).toBe("public");
                });
            });

            it("includes all Easter-related holidays", () => {
                const movingNames = ["Good Friday", "Easter Monday", "Ascension Day", "Pentecost"];
                movingNames.forEach(name => {
                    const holiday = holidays.find(h => h.name === name);
                    expect(holiday).toBeDefined();
                    expect(holiday?.type).toBe("public");
                });
            });

            it("includes Midsummer Day", () => {
                const midsummer = holidays.find(h => h.name === "Midsummer Day");
                expect(midsummer).toBeDefined();
                expect(midsummer?.type).toBe("public");

                // Ensure it's between June 20-26
                const midsummerDate = DateTime.fromFormat(midsummer!.date, "dd-MM-yyyy");
                expect(midsummerDate.month).toBe(6);
                expect(midsummerDate.day).toBeGreaterThanOrEqual(20);
                expect(midsummerDate.day).toBeLessThanOrEqual(26);
                expect(midsummerDate.weekday).toBe(6); // Saturday
            });

            it("aggregated getHolidays returns correct total count", () => {
                // 7 fixed + 4 Easter-related + 1 Midsummer
                const expectedCount = 7 + 4 + 1;
                expect(holidays.length).toBe(expectedCount);
            });

            it("matches snapshot for full holiday list", () => {
                expect(holidays).toMatchSnapshot();
            });

            it("has correctly formatted dates", () => {
                holidays.forEach(h => {
                    // Must match dd-MM-yyyy
                    expect(h.date).toMatch(/^\d{2}-\d{2}-\d{4}$/);
                });
            });

            it("returns consistent dates for fixed holidays across multiple years", () => {
                const independenceDay = holidays.find(h => h.name === "Independence Day");
                expect(independenceDay?.date.endsWith(`-${year}`)).toBe(true);
            });
        });
    });
});
