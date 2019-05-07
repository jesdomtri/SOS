describe("Check if a new company can be created. ", function() {
    it("List grow after the company creation", function() {
        browser.get("http://localhost:8080/ui/v1/companies/#!/");
        var initialCompanies = element.all(by.repeater("company in companies"))
            .then(function(initialCompanies) {
                element(by.model("country")).sendKeys("a");
                element(by.model("year")).sendKeys("1");
                element(by.model("numberOfCompanies")).sendKeys("1");
                element(by.model("sector")).sendKeys("1");
                element(by.model("page")).sendKeys("1");
                element(by.name("crearCompany")).click();

                element.all(by.repeater("company in companies"))
                    .then(function(finalCompanies) {
                        expect(finalCompanies.length).toEqual(initialCompanies.length + 1);
                    });
            });
    });
});
