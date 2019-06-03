describe("Check if a new attackcan be created. ", function() {
    it("List grow after the attack creation", function() {
        browser.get("https://sos1819-03.herokuapp.com/#!/ui/v1/computer-attacks-stats");
        var initialAttacks = element.all(by.repeater("attack in attacks"))
            .then(function(initialAttacks) {
                element(by.model("country")).sendKeys("a");
                element(by.model("year")).sendKeys("1");
                element(by.model("attacktype")).sendKeys("a");
                element(by.model("economicimpactmillions")).sendKeys("1");
                element(by.model("affectedequipments")).sendKeys("1");
                element(by.model("overallpercentage")).sendKeys("1");
                element(by.name("crearAttack")).click();

                element.all(by.repeater("attack in attacks"))
                    .then(function(finalAttacks) {
                        expect(finalAttacks.length).toEqual(initialAttacks.length + 1);
                    });
            });
    });
});
