/* global element, by, browser, expect*/

describe("Data is loaded", function() {
    it("Should show a bunch of data", function() {
        browser.get("https://sos1819-03.herokuapp.com/#!/ui/v1/country-stats");
        var stats = element.all(by.repeater("stat in stats"));
        expect(stats.count()).toBeGreaterThan(0);
    });
});
