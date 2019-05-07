describe("Check if a contact can be deleted", function() {
    it("List grow after the contact deletion", function() {
        browser.get("http://localhost:8080/ui/v1/country-stats/#!/");
       var initialStats = element.all(by.repeater("stat in stats"))
            .then(function(initialStats) {
                element(by.model("newStat.country")).sendKeys("Irán");
                element(by.model("newStat.year")).sendKeys("2023");
                element(by.css('[value=="Delete"]')).click();

                element.all(by.repeater("stat in stats"))
                    .then(function(finalStats) {
                        expect(finalStats.length).toEqual(initialStats.length - 1);
                    });
            });
    });
});
