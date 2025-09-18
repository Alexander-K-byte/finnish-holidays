# Finnish Holidays

A small **TypeScript library** for calculating Finnish public holidays.  
Supports both fixed-date and moving holidays (like Easter-based holidays).

---
## fixed holidays

Hard coded fixed holiday dates 
e.g.. Christmas Day, New Year.

---
## Shifting holidays
Added additional code to work out dates for the following:
* Good Friday
* Easter Monday
* Ascension Day
* Pentecost
* Midsummer Day

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

## Under Development...
