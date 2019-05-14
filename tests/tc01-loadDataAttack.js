describe("Data is loaded", function() {
    it("Should show a bunch of data", function() {
        browser.get("http://localhost:8080/#!/ui/v1/computer-attacks-stats");
        var attacks = element.all(by.repeater("attack in attacks"));
        expect(attacks.count()).toBeGreaterThan(0);
    });
});
