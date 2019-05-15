describe("Check if a contact can be deleted", function() {
    it("List grow after the contact deletion", function() {
        browser.get("https://sos1819-03.herokuapp.com/#!/ui/v1/country-stats");
       var initialStats = element.all(by.repeater("stat in stats"))
            .then(function(initialStats) {
                //element(by.name('BorrarStat')).click();
                element.all(by.css('.btn-danger')).last().click();
                
                element.all(by.repeater("stat in stats"))
                    .then(function(finalStats) {
                        expect(finalStats.length).toEqual(initialStats.length - 1);
                    });
            });
    });
});
