describe("Check if a new stat can be created", function() {
    it("List grow after the stat creation", function() {
         browser.get("https://sos1819-03.herokuapp.com/#!/ui/v1/country-stats");
        var initialStats = element.all(by.repeater("stat in stats"))
            .then(function(initialStats) {
                element(by.model('country')).sendKeys("Irán");
                element(by.model('year')).sendKeys(2023);
                element(by.model('extensionOfBorders')).sendKeys(457578);
                element(by.model('population')).sendKeys(4363767834);
                element(by.model('territorialExtension')).sendKeys(2345235263);
                element(by.name('CrearStat')).click();

                element.all(by.repeater("stat in stats"))
                    .then(function(finalStats) {
                        expect(finalStats.length).toEqual(initialStats.length + 1);
                    });
            });
    });
});
