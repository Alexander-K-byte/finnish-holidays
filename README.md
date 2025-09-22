# Finnish Holidays

A small **TypeScript library** for calculating Finnish public holidays.  
Supports both fixed-date and moving holidays (like Easter-based holidays).

---
## fixed holidays

Hard coded fixed holiday dates 
* New Year's Day
* Epiphany
* May Day
* All Saints' Day
* Independence Day
* Christmas Day
* Boxing Day

---
## Shifting holidays
Computus algorithm used to find Easter Sunday.
* Following holidays calculated from Easter Sunday:
  + Good Friday
  + Easter Monday
  + Ascension Day
  + Pentecost
  + Midsummer Day

---

## Additional testing
Small script added for testing:
* test that fixed holiday was found
* should include all calculated moving holidays
    + Holiday name
    + Holiday type
    + Holiday date
* should return the correct number of fixed holidays for 2025
    + Holiday name
    + Holiday type
    + Correct count of fixed holidays

### Further testing

Tested for multiple years, included snapshot testing to ensure
correct dates were found and that it worked for leap years.

### Changes
Handler

* Changed from date-fns to luxon
* Created Holiday type
* Easter
    + Removed export for Easter Sunday
    + Consolidated all Easter based holidays in to a single block
    + Updated exports
* Changed method of finding Midsummer from iteration to calculation

Index

* Updated imports
* Updated returns for getHolidays

Testing

* Implemented more comprehensive testing
* Test output now has coverage and verbose outputs

---EOF---
