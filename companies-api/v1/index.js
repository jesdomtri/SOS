module.exports = function(app, companies) {
    //GET /api/v1/companies/docs
    app.get("/api/v1/companies/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/7046928/S17utmxK");
    });


    //GET /companies/loadInitialData
    app.get("/api/v1/companies/loadInitialData", (req, res) => {
        var initialCompanies = [
            { country: "France", year: 2017, numberOfCompanies: 6380, sector: 24, page: 6236 },
            { country: "UK", year: 2017, numberOfCompanies: 7311, sector: 25, page: 6391 },
            { country: "Japan", year: 2017, numberOfCompanies: 10442, sector: 22, page: 9254 },
            { country: "Germany", year: 2017, numberOfCompanies: 6243, sector: 31, page: 6041 },
            { country: "EEUU", year: 2017, numberOfCompanies: 31148, sector: 34, page: 28745 },
            { country: "Spain", year: 2017, numberOfCompanies: 1409159, sector: 46, page: 1409159 }
        ];

        companies.find({}).toArray((error, companiesArray) => {
            if (companiesArray.length == 0) {
                companies.insert(initialCompanies);
                res.sendStatus(200);
            }
            else {
                res.sendStatus(409);
            }
        });
    });

    //GET /companies/
    app.get("/api/v1/companies", (req, res) => {
        var query = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        Object.keys(req.query).forEach((i) => {
            if (isNaN(req.query[i]) == false) {
                query[i] = parseInt(req.query[i]);
            }
            else {
                query[i] = req.query[i];
            }
        });

        if (Object.keys(req.query).includes("from") && Object.keys(req.query).includes("to")) {
            delete query.from;
            delete query.to;
            query["country"] = { "$lte": parseInt(req.query["to"]), "$gte": parseInt(req.query["from"]) };
        }
        else if (Object.keys(req.query).includes('from')) {
            delete query.from;
            query["country"] = { "$gte": parseInt(req.query["from"]) };
        }
        else if (Object.keys(req.query).includes("to")) {
            delete query.to;
            query["country"] = { "$lte": parseInt(req.query["to"]) };
        }

        companies.find(query).skip(offset).limit(limit).toArray((error, companiesArray) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                res.send(companiesArray);
            }
        });
    });
    //POST /companies/
    app.post("/api/v1/companies", (req, res) => {
        var newCompany = req.body;

        var keys = ["country", "year", "numberOfCompanies", "sector", "page"];

        for (var i = keys.length - 1; i--;) {
            if (!newCompany.hasOwnProperty(keys[i])) {
                return res.sendStatus(400);
            }
        }

        var countryCompany = req.body.country;
        var yearCompany = req.body.year;
        companies.find({ "country": countryCompany, "year": yearCompany }).toArray((error, companiesArray) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (companiesArray.length > 0) {
                    res.sendStatus(409);
                }
                else {
                    companies.insert(newCompany);
                    res.sendStatus(201);
                }
            }
        });
    });
    //DELETE /companies/
    app.delete("/api/v1/companies", (req, res) => {
        companies.remove({});
        res.sendStatus(200);
    });
    //GET /companies/France
    app.get("/api/v1/companies/:country", (req, res) => {
        var country = req.params.country;
        companies.find({ "country": country }).toArray((error, filteredcompanies) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (filteredcompanies.length >= 1) {
                    res.send(filteredcompanies);
                }
                else {
                    res.sendStatus(404);
                }
            }
        });
    });
    //GET /companies/France/2017
    app.get("/api/v1/companies/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        companies.find({ "country": country, "year": parseInt(year) }).toArray((error, filteredcompanies) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (filteredcompanies.length >= 1) {
                    res.send(filteredcompanies[0]);
                }
                else {
                    res.sendStatus(404);
                }
            }
        });
    });
    //PUT /companies/France
    app.put("/api/v1/companies/:country", (req, res) => {
        var country = req.params.country;
        var updatedCompany = req.body;

        var keys = ["country", "year", "numberOfCompanies", "sector", "page"];

        for (var i = keys.length - 1; i--;) {
            if (!updatedCompany.hasOwnProperty(keys[i])) {
                return res.sendStatus(400);
            }
        }

        companies.find({ "country": country }).toArray((error, filteredcompanies) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                companies.updateOne({ "country": country }, { $set: updatedCompany });
                res.sendStatus(200);
            }
        });
    });
    //DELETE /companies/France
    app.delete("/api/v1/companies/:country", (req, res) => {
        var country = req.params.country;
        companies.find({ "country": country }).toArray((error, filteredcompanies) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (filteredcompanies.length == 0) {
                    res.sendStatus(404);
                }
                else {
                    companies.deleteOne({ "country": country });
                    res.sendStatus(200);
                }
            }
        });
    });
    //POST ERROR
    app.post("/api/v1/companies/:country", (req, res) => {
        res.sendStatus(405);
    });
    //PUT ERROR
    app.put("/api/v1/companies", (req, res) => {
        res.sendStatus(405);
    });

}