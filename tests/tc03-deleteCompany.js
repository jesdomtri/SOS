describe("Check if a contact can be deleted", function() {
    it("List grow after the contact deletion", function() {
        browser.get("https://sos1819-03.herokuapp.com/#!/ui/v1/companies");
        var initialCompanies = element.all(by.repeater("company in companies"))
            .then(function(initialCompanies) {
                element.all(by.css('.btn-danger')).last().click();

                element.all(by.repeater("company in companies"))
                    .then(function(finalCompanies) {
                        expect(finalCompanies.length).toEqual(initialCompanies.length - 1);
                    });
            });
    });
});
