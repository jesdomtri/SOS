module.exports = function(app, stats) {

    app.get("/api/v1/country-stats/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/6926352/S17tPnEL");
    });

    //GET /country-stats/loadInitialData
    app.get("/api/v1/country-stats/loadInitialData", (req, res) => {
        var newStats = [
            { "country": "France", "year": 2017, "extensionOfBorders": 2889, "population": 67120000, "territorialExtension": 643801 },
            { "country": "UK", "year": 2017, "extensionOfBorders": 443, "population": 66020000, "territorialExtension": 243610 },
            { "country": "Japan", "year": 2017, "extensionOfBorders": 0, "population": 126800000, "territorialExtension": 377915 },
            { "country": "Germany", "year": 2017, "extensionOfBorders": 3714, "population": 82790000, "territorialExtension": 357022 },
            { "country": "EEUU", "year": 2017, "extensionOfBorders": 12048, "population": 325700000, "territorialExtension": 9371174 }
        ];

        stats.find({}).toArray((error, statsArray) => {
            if (statsArray.length == 0) {
                stats.insert(newStats);
                res.sendStatus(200); //OK
            }
            else {
                res.sendStatus(409); //Conflict
            }
        });
    });

    //GET /country-stats/
    app.get("/api/v1/country-stats", (req, res) => {
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

        stats.find(query).skip(offset).limit(limit).toArray((error, statsArray) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                statsArray.forEach(function(element) {
                    delete element._id;
                });
                res.send(statsArray);
            }
        });
    });
//GET /country-stats/País
app.get("/api/v1/country-stats/:country", (req, res) => {
    var country = req.params.country;
    stats.find({ "country": country }).toArray((error, filteredstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredstats.length >= 1) {
             filteredstats.forEach(function(element) {
                  delete element._id;
                });
            res.send(filteredstats);
        }
        else {
            res.sendStatus(404); //Not Found
        }
    });
});

//GET /country-stats/País/Año
app.get("/api/v1/country-stats/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    stats.find({ "country": country, "year": parseInt(year) }).toArray((error, filteredstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredstats.length >= 1) {
             filteredstats.forEach(function(element) {
                  delete element._id;
                });
            res.send(filteredstats[0]);
        }
        else {
            res.sendStatus(404); //Not Found
        }
    //GET /country-stats/País
    app.get("/api/v1/country-stats/:country", (req, res) => {
        var country = req.params.country;
        stats.find({ "country": country }).toArray((error, filteredstats) => {
            if (error) {
                console.log("Error: " + error);
            }
            if (filteredstats.length >= 1) {
                res.send(filteredstats);
            }
            else {
                res.sendStatus(404); //Not Found
            }
        });
    });

    //GET /country-stats/País/Año
    app.get("/api/v1/country-stats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        stats.find({ "country": country, "year": parseInt(year) }).toArray((error, filteredstats) => {
            if (error) {
                console.log("Error: " + error);
            }
            if (filteredstats.length >= 1) {
                res.send(filteredstats[0]);
            }
            else {
                res.sendStatus(404); //Not Found
            }
        });
    });
    //POST /country-stats/
    app.post("/api/v1/country-stats", (req, res) => {
        var newStat = req.body;

        var keys = ["country", "year", "extensionOfBorders", "population", "territorialExtension"];

        for (var i = keys.length - 1; i--;) {
            if (!newStat.hasOwnProperty(keys[i])) {
                return res.sendStatus(400); //Bad Request
            }
        }

        var countryStat = req.body.country;
        stats.find({ "country": countryStat }).toArray((error, statsArray) => {
            if (statsArray.length > 0) {
                res.sendStatus(409); //Conflict
            }
            else {
                stats.insert(newStat);
                res.sendStatus(201); //Created
            }
        });
    });
    //DELETE /country-stats/
    app.delete("/api/v1/country-stats", (req, res) => {
        stats.remove({});
        res.sendStatus(200); //OK
    });

    //PUT /companies/France
    app.put("/api/v1/country-stats/:country", (req, res) => {
        var country = req.params.country;
        var updatedStats = req.body;

        var keys = ["country", "year", "extensionOfBorders", "population", "territorialExtension"];

        for (var i = keys.length - 1; i--;) {
            if (!updatedStats.hasOwnProperty(keys[i])) {
                return res.sendStatus(400); //Bad Request
            }
        }


        stats.find({ "country": country }).toArray((err, statsArray) => {
            if (err)
                console.log(err);
            if (statsArray == 0) {
                res.sendStatus(400); //Bad Request
            }
            else {

                stats.updateOne({
                    "country": country,
                }, {
                    $set: updatedStats
                });
                res.sendStatus(200); //     OK

            }
        });
    });
    //DELETE /country-stats/France
    app.delete("/api/v1/country-stats/:country", (req, res) => {

        var country = req.params.country;
        stats.find({ "country": country }).toArray((error, filteredstats) => {
            if (error) {
                console.log("Error: " + error);
            }
            if (filteredstats.length == 0) {
                res.sendStatus(404); // Not Found
            }
            else {
                stats.deleteOne({ "country": country });
                res.sendStatus(200); // OK
            }
        });
    });

    //POST ERROR
    app.post("/api/v1/country-stats/:country", (req, res) => {
        res.sendStatus(405); // Method Not Allowed
    });
    //PUT ERROR
    app.put("/api/v1/country-stats", (req, res) => {
        res.sendStatus(405); // Method Not Allowed
    });
}
