describe("Check if a new stat can be created", function() {
    it("List grow after the stat creation", function() {
        browser.get("http://localhost:8080");
        var initialStats = element.all(by.repeater("stat in stats"))
            .then(function(initialStats) {
                element(by.model("newStat.country")).sendKeys("Irán");
                element(by.model("newStat.year")).sendKeys("2023");
                element(by.model("newStat.extensionOfBorders")).sendKeys("457578");
                element(by.model("newStat.population")).sendKeys("4363767834");
                element(by.model("newStat.territorialExtension")).sendKeys("2345235263");
                element(by.css('[value=="Add"]')).click();

                element.all(by.repeater("stat in stats"))
                    .then(function(finalStats) {
                        expect(finalStats.length).toEqual(initialStats.length + 1);
                    });
            });
    });
});
