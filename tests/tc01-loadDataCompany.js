describe("Data is loaded", function() {
    it("Should show a bunch of data", function() {
        browser.get("https://sos1819-03.herokuapp.com/#!/ui/v1/companies");
        var companies = element.all(by.repeater("company in companies"));
        expect(companies.count()).toBeGreaterThan(0);
    });
});
