/*app.get("/api/v1/country-stats/docs/", (req, res) => {
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
            res.sendStatus(200);
        }
        else {
            res.sendStatus(409);
        }
    });
});

//GET /country-stats/
app.get("/api/v1/country-stats", (req, res) => {
    stats.find({}).toArray((error, companiesArray) => {
        res.send(companiesArray);
    });
});
//POST /country-stats/
app.post("/api/v1/country-stats", (req, res) => {
    var newStat = req.body;

    var keys = ["country", "year", "extensionOfBorders", "population", "territorialExtension"];

    for (var i = keys.length - 1; i--;) {
        if (!newStat.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }

    var countryStat = req.body.country;
    stats.find({ "country": countryStat }).toArray((error, statsArray) => {
        if (statsArray.length > 0) {
            res.sendStatus(409);
        }
        else {
            stats.insert(newStat);
            res.sendStatus(201);
        }
    });
});
//DELETE /country-stats/
app.delete("/api/v1/country-stats", (req, res) => {
    stats.remove({});
    res.sendStatus(200);
});
//GET /country-stats/France
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
            res.sendStatus(404);
        }
    });
});
//PUT /companies/France
app.put("/api/v1/country-stats/:country", (req, res) => {
    var country = req.params.country;
    var updatedStats = req.body;

    var keys = ["country", "year", "extensionOfBorders", "population", "territorialExtension"];

    for (var i = keys.length - 1; i--;) {
        if (!updatedStats.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }


    stats.find({ "country": country }).toArray((err, statsArray) => {
        if (err)
            console.log(err);
        if (statsArray == 0) {
            res.sendStatus(400);
        }
        else {

            stats.updateOne({
                "country": country,
            }, {
                $set: updatedStats
            });
            res.sendStatus(200);

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
            res.sendStatus(404);
        }
        else {
            stats.deleteOne({ "country": country });
            res.sendStatus(200);
        }
    });
});

//POST ERROR
app.post("/api/v1/country-stats/:country", (req, res) => {
    res.sendStatus(405);
});
//PUT ERROR
app.put("/api/v1/country-stats", (req, res) => {
    res.sendStatus(405);
});
*/