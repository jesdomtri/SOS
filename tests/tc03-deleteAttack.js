describe("Check if a Attackcan be deleted", function() {
    it("List grow after the attack deletion", function() {
        browser.get("https://sos1819-03.herokuapp.com/#!/ui/v1/computer-attacks-stats");
        var initialAttacks = element.all(by.repeater("attack in attacks"))
            .then(function(initialAttacks) {
                element.all(by.css('.btn-danger')).last().click();

                element.all(by.repeater("attack in attacks"))
                    .then(function(finalAttacks) {
                        expect(finalAttacks.length).toEqual(initialAttacks.length - 1);
                    });
            });
    });
});
