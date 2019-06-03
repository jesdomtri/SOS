describe("Data is loaded", function() {
    it("Should show a bunch of data", function() {
        browser.get("https://sos1819-03.herokuapp.com/#!/ui/v1/computer-attacks-stats");
        var attacks = element.all(by.repeater("attack in attacks"));
        expect(attacks.count()).toBeGreaterThan(0);
    });
});
