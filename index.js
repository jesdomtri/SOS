var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/public")); // __dircountry equivale a la ruta raiz donde se esta ejecutando el jnode

//API Jesus
var companies = [];


//GET /companies/loadInitialData
app.get("/api/v1/companies/loadInitialData", (req, res) => {
    companies = [
        { country: "France", year: "2017", numberOfCompanies: "6380", sector: "24", page: "6236" },
        { country: "UK", year: "2017", numberOfCompanies: "7311", sector: "25", page: "6391" },
        { country: "Japan", year: "2017", numberOfCompanies: "10442", sector: "22", page: "9254" },
        { country: "Germany", year: "2017", numberOfCompanies: "6243", sector: "31", page: "6041" },
        { country: "EEUU", year: "2017", numberOfCompanies: "31148", sector: "34", page: "28745" },
        { country: "Spain", year: "2017", numberOfCompanies: "1409159", sector: "46", page: "1409159" }
    ]
    res.sendStatus(200);
});

//GET /companies/
app.get("/api/v1/companies", (req, res) => {
    res.send(companies);
});
//POST /companies/
app.post("/api/v1/companies", (req, res) => {
    var newCompany = req.body;
    companies.push(newCompany);
    res.sendStatus(201);
});
//DELETE /companies/
app.delete("/api/v1/companies", (req, res) => {
    companies = [];
    res.sendStatus(200);
});
//GET /companies/France
app.get("/api/v1/companies/:country", (req, res) => {
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
app.put("/api/v1/companies/:country", (req, res) => {

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
app.delete("/api/v1/companies/:country", (req, res) => {

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

app.listen(port, () => {
    console.log("Server is ready!!");
});

//API Antonio
var stats = [
    //{ country: "Canada", year: "2017", numberOfCompanies: "7376", sector: "13", page: "7250" }
];


//GET /country-stats/loadInitialData
app.get("/api/v1/country-stats/loadInitialData", (req, res) => {
    stats = [
        { country: "France", year: "2017", extensionOfBorders: "2889", population: "67120000", territorialExtension: "643801" },
        { country: "UK", year: "2017", extensionOfBorders: "443", population: "66020000", territorialExtension: "243610" },
        { country: "Japan", year: "2017", extensionOfBorders: "0", population: "126800000", territorialExtension: "377915" },
        { country: "Germany", year: "2017", extensionOfBorders: "3714", population: "82790000", territorialExtension: "357022" },
        { country: "EEUU", year: "2017", extensionOfBorders: "12048", population: "325700000", territorialExtension: "9371174" }
    ]
    res.sendStatus(200);
});

//GET /country-stats/
app.get("/api/v1/country-stats", (req, res) => {
    res.send(stats);
});
//POST /country-stats/
app.post("/api/v1/country-stats", (req, res) => {
    var newStat = req.body;
    stats.push(newStat);
    res.sendStatus(201);
});
//DELETE /country-stats/
app.delete("/api/v1/country-stats", (req, res) => {
    stats = [];
    res.sendStatus(200);
});
//GET /country-stats/France
app.get("/api/v1/country-stats/:country", (req, res) => {
    var country = req.params.country;
    var filteredstats = stats.filter((s) => { return s.country == country; })
    if (filteredstats.length >= 1) {
        res.send(filteredstats[0])
    }
    else {
        res.sendStatus(404);
    }

});

//PUT /country-stats/France
app.put("/api/v1/country-stats/:country", (req, res) => {

    var country = req.params.country;
    var updatedStats = req.body;
    var found = false;

    var updatedStats = stats.map((s) => {

        if (s.country == country) {
            found = true;
            return updatedStats;
        }
        else {
            return s;
        }

    })

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        stats = updatedStats;
        res.sendStatus(200);
    }

});
//DELETE /country-stats/France
app.delete("/api/v1/country-stats/:country", (req, res) => {

    var country = req.params.country;
    var found = false;

    var updatedStats = stats.filter((s) => {
        if (s.country == country) {
            found = true;
        }

        return s.country != country;
    })

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        stats = updatedStats;
        res.sendStatus(200);
    }

});

