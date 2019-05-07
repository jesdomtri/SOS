describe("Check if a contact can be deleted", function() {
    it("List grow after the contact deletion", function() {
        browser.get("http://localhost:8080");
        var initialCompanies = element.all(by.repeater("company in companies"))
            .then(function(initialCompanies) {
                element(by.model("newCompany.country")).sendKeys("España");
                element(by.model("newCompany.year")).sendKeys("1");
                element(by.model("newCompany.numberOfCompanies")).sendKeys("1");
                element(by.model("newCompany.sector")).sendKeys("1");
                element(by.model("newCompany.page")).sendKeys("1");
                element(by.css('[value=="Delete"]')).click();

                element.all(by.repeater("company in companies"))
                    .then(function(finalCompanies) {
                        expect(finalCompanies.length).toEqual(initialCompanies.length - 1);
                    });
            });
    });
});
