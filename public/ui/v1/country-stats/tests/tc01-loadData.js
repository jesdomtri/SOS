describe("Data is loaded", function() {
    it("Should show a bunch of data", function() {
        browser.get("http://localhost:8080");
        var stats = element.all(by.repeater("stat in stats"));
        expect(stats.count()).toBeGreaterThan(0);
    });
});
