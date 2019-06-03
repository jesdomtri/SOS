describe("Check if a new stat can be created ", function() {
    it("List grow after the stat creation", function() {
        browser.get("https://sos1819-03.herokuapp.com/#!/ui/v1/country-stats");
        check();

        function check() {
            element
                .all(by.repeater("stat in stats"))
                .then(function(initialStats) {
                    if (initialStats.length < 10) {
                        element.all(by.css('.btn-danger')).last().click();
                        element
                            .all(by.repeater("stat in stats"))
                            .then(function(finalStats) {
                                expect(initialStats.length).toBeGreaterThan(finalStats.length);
                            });

                    }
                    else if (initialStats.length == 0) {
                        element(by.name('Retroceder')).click();

                        element.all(by.css('.btn-danger')).last().click();

                        element
                            .all(by.repeater("stat in stats"))
                            .then(function(finalStats) {

                                expect(initialStats.length).toBeGreaterThan(finalStats.length);

                            });

                    }
                    else {

                        element(by.name('Avanzar')).click().then(check());

                    }

                });

        }


    });

});
