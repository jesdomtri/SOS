describe("Data is loaded", function() {
    it("Should show a bunch of data", function() {
        browser.get("http://localhost:8080");
        var companies = element.all(by.repeater("company in companies"));
        expect(companies.count()).toBeGreaterThan(0);
    });
});
