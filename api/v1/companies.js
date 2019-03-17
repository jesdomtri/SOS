var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var companies = [
    { country: "France", year: "2017", numberOfCompanies: "6380", sector: "24", page: "6236" },
    { country: "UK", year: "2017", numberOfCompanies: "7311", sector: "25", page: "6391" },
    { country: "Japan", year: "2017", numberOfCompanies: "10442", sector: "22", page: "9254" },
    { country: "Germany", year: "2017", numberOfCompanies: "6243", sector: "31", page: "6041" },
    { country: "EEUU", year: "2017", numberOfCompanies: "31148", sector: "34", page: "28745" }
    //{ country: "Canada", year: "2017", numberOfCompanies: "7376", sector: "13", page: "7250" }
];


//GET /companies/
app.get("/companies", (req, res) => {
    res.send(companies);
});
//POST /companies/
app.post("/companies", (req, res) => {
    var newCompany = req.body;
    companies.push(newCompany);
    res.sendStatus(201);
});
//DELETE /companies/
app.delete("/companies", (req, res) => {
    companies = [];
    res.sendStatus(200);
});
//GET /companies/France
app.get("/companies/:country", (req, res) => {
    var country = req.params.country;
    var filteredcompanies = companies.filter((c) => { return c.country == country; })
    if (filteredcompanies.length >= 1) {
        res.send(filteredcompanies[0])
    }
    else {
        res.sendStatus(404);
    }

});

//PUT /companies/France
app.put("/companies/:country", (req, res) => {

    var country = req.params.country;
    var updatedCompany = req.body;
    var found = false;

    var updatedcompanies = companies.map((c) => {

        if (c.country == country) {
            found = true;
            return updatedCompany;
        }
        else {
            return c;
        }

    })

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        companies = updatedcompanies;
        res.sendStatus(200);
    }

});
//DELETE /companies/France
app.delete("/companies/:country", (req, res) => {

    var country = req.params.country;
    var found = false;

    var updatedcompanies = companies.filter((c) => {
        if (c.country == country) {
            found = true;
        }

        return c.country != country;
    })

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        companies = updatedcompanies;
        res.sendStatus(200);
    }

});

app.listen(port, () => { console.log("server ready on port " + port); });
