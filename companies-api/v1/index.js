module.exports = function(app, companies, BASE_PATH) {
    //GET companies/docs
    app.get(BASE_PATH + "/companies/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/7046928/S17utmxK");
    });


    //GET /companies/loadInitialData
    app.get(BASE_PATH + "/companies/loadInitialData", (req, res) => {
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
    app.get(BASE_PATH + "/companies", (req, res) => {
        var query = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        //Paginacion
        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        //Busqueda
        Object.keys(req.query).forEach((i) => {
            if (isNaN(req.query[i]) == false) {
                query[i] = parseInt(req.query[i]);
            }
            else {
                query[i] = req.query[i];
            }
        });

        companies.find(query).skip(offset).limit(limit).toArray((error, companiesArray) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                companiesArray.forEach(function(element) {
                    delete element._id;
                });
                res.send(companiesArray);
            }
        });
    });
    //POST /companies/
    app.post(BASE_PATH + "/companies", (req, res) => {
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
    app.delete(BASE_PATH + "/companies", (req, res) => {
        companies.remove({});
        res.sendStatus(200);
    });
    //GET /companies/France
    app.get(BASE_PATH + "/companies/:country", (req, res) => {
        var country = req.params.country;
        companies.find({ "country": country }).toArray((error, filteredcompanies) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (filteredcompanies.length >= 1) {
                    filteredcompanies.forEach(function(element) {
                        delete element._id;
                    });
                    res.send(filteredcompanies);
                }
                else {
                    res.sendStatus(404);
                }
            }
        });
    });
    //GET /companies/France/2017
    app.get(BASE_PATH + "/companies/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        companies.find({ "country": country, "year": parseInt(year) }).toArray((error, filteredcompanies) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (filteredcompanies.length >= 1) {
                    filteredcompanies.forEach(function(element) {
                        delete element._id;
                    });
                    res.send(filteredcompanies[0]);
                }
                else {
                    res.sendStatus(404);
                }
            }
        });
    });
    //PUT /companies/:country/:year
    app.put(BASE_PATH + "/companies/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        var updatedCompany = req.body;

        var keys = ["country", "year", "numberOfCompanies", "sector", "page"];

        for (var i = keys.length - 1; i--;) {
            if (!updatedCompany.hasOwnProperty(keys[i])) {
                return res.sendStatus(400);
            }
        }

        companies.find({ "country": country, "year": parseInt(year) }).toArray((error, filteredcompanies) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (req.body.country != country && req.body.year != year) {
                    res.sendStatus(400);
                }
                else {
                    if (filteredcompanies.length > 0) {
                        companies.update({ "country": country, "year": parseInt(year) }, updatedCompany);
                        res.sendStatus(200);
                    }
                    else {
                        res.sendStatus(404);
                    }
                }
            }
        });
    });
    //DELETE /companies/France
    app.delete(BASE_PATH + "/companies/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        companies.find({ "country": country, "year": parseInt(year) }).toArray((error, filteredcompanies) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (filteredcompanies.length == 0) {
                    res.sendStatus(404);
                }
                else {
                    companies.deleteOne({ "country": country, "year": parseInt(year) });
                    res.sendStatus(200);
                }
            }
        });
    });
    //POST ERROR
    app.post(BASE_PATH + "/companies/:country", (req, res) => {
        res.sendStatus(405);
    });
    //PUT ERROR
    app.put(BASE_PATH + "/companies", (req, res) => {
        res.sendStatus(405);
    });
    app.put(BASE_PATH + "/companies/:country", (req, res) => {
        res.sendStatus(405);
    });
    app.put(BASE_PATH + "/companies/:year", (req, res) => {
        res.sendStatus(405);
    });

}
