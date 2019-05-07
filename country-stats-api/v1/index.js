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
            { "country": "EEUU", "year": 2017, "extensionOfBorders": 12048, "population": 325700000, "territorialExtension": 9371174 },
            { "country": "Albania", "year": 2017, "extensionOfBorders": 691, "population": 2870324, "territorialExtension": 28748 },
            { "country": "Albania", "year": 2016, "extensionOfBorders": 691, "population": 2876591, "territorialExtension": 28748 },
            { "country": "Australia", "year": 2017, "extensionOfBorders": 0, "population": 25043027, "territorialExtension": 7741220 },
            { "country": "Austria", "year": 2018, "extensionOfBorders": 2524, "population": 8823054, "territorialExtension": 83871 },
            { "country": "Brasil", "year": 2017, "extensionOfBorders": 16145, "population": 208385000, "territorialExtension": 	8515770 }
            /*{ "country": "Canada", "year": 2018, "extensionOfBorders": 8893, "population": 37067011, "territorialExtension": 9984670 },
            { "country": "Finlandia", "year": 2017, "extensionOfBorders": 2563, "population": 55130004, "territorialExtension": 338145 },
            { "country": "Grecia", "year": 2013, "extensionOfBorders": 1935, "population": 11329600, "territorialExtension": 131957 }*/
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
            query["year"] = { "$lte": parseInt(req.query["to"]), "$gte": parseInt(req.query["from"]) };
        }
        else if (Object.keys(req.query).includes('from')) {
            delete query.from;
            query["year"] = { "$gte": parseInt(req.query["from"]) };
        }
        else if (Object.keys(req.query).includes("to")) {
            delete query.to;
            query["year"] = { "$lte": parseInt(req.query["to"]) };
        }
        
        if (Object.keys(req.query).includes("minext") && Object.keys(req.query).includes("maxext")) {
            delete query.minext;
            delete query.maxext;
            query["extensionOfBorders"] = { "$lte": parseInt(req.query["maxext"]), "$gte": parseInt(req.query["minext"]) };
        }
        else if (Object.keys(req.query).includes('minext')) {
            delete query.minext;
            query["extensionOfBorders"] = { "$gte": parseInt(req.query["minext"]) };
        }
        else if (Object.keys(req.query).includes("maxext")) {
            delete query.maxext;
            query["extensionOfBorders"] = { "$lte": parseInt(req.query["maxext"]) };
        }
        
        if (Object.keys(req.query).includes("minpop") && Object.keys(req.query).includes("maxpop")) {
            delete query.minpop;
            delete query.maxpop;
            query["population"] = { "$lte": parseInt(req.query["maxpop"]), "$gte": parseInt(req.query["minpop"]) };
        }
        else if (Object.keys(req.query).includes('minpop')) {
            delete query.minpop;
            query["population"] = { "$gte": parseInt(req.query["minpop"]) };
        }
        else if (Object.keys(req.query).includes("maxpop")) {
            delete query.maxpop;
            query["population"] = { "$lte": parseInt(req.query["maxpop"]) };
        }
        
        if (Object.keys(req.query).includes("minter") && Object.keys(req.query).includes("maxter")) {
            delete query.minter;
            delete query.maxter;
            query["territorialExtension"] = { "$lte": parseInt(req.query["maxter"]), "$gte": parseInt(req.query["minter"]) };
        }
        else if (Object.keys(req.query).includes('minter')) {
            delete query.minter;
            query["territorialExtension"] = { "$gte": parseInt(req.query["minter"]) };
        }
        else if (Object.keys(req.query).includes("maxter")) {
            delete query.maxter;
            query["territorialExtension"] = { "$lte": parseInt(req.query["maxter"]) };
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
        
        if (Object.keys(req.query).includes("from") && Object.keys(req.query).includes("to")) {
            delete query.from;
            delete query.to;
            query["year"] = { "$lte": parseInt(req.query["to"]), "$gte": parseInt(req.query["from"]) };
        }
        else if (Object.keys(req.query).includes('from')) {
            delete query.from;
            query["year"] = { "$gte": parseInt(req.query["from"]) };
        }
        else if (Object.keys(req.query).includes("to")) {
            delete query.to;
            query["year"] = { "$lte": parseInt(req.query["to"]) };
        }
        
        if (Object.keys(req.query).includes("minext") && Object.keys(req.query).includes("maxext")) {
            delete query.minext;
            delete query.maxext;
            query["extensionOfBorders"] = { "$lte": parseInt(req.query["maxext"]), "$gte": parseInt(req.query["minext"]) };
        }
        else if (Object.keys(req.query).includes('minext')) {
            delete query.minext;
            query["extensionOfBorders"] = { "$gte": parseInt(req.query["minext"]) };
        }
        else if (Object.keys(req.query).includes("maxext")) {
            delete query.maxext;
            query["extensionOfBorders"] = { "$lte": parseInt(req.query["maxext"]) };
        }
        
        if (Object.keys(req.query).includes("minpop") && Object.keys(req.query).includes("maxpop")) {
            delete query.minpop;
            delete query.maxpop;
            query["population"] = { "$lte": parseInt(req.query["maxpop"]), "$gte": parseInt(req.query["minpop"]) };
        }
        else if (Object.keys(req.query).includes('minpop')) {
            delete query.minpop;
            query["population"] = { "$gte": parseInt(req.query["minpop"]) };
        }
        else if (Object.keys(req.query).includes("maxpop")) {
            delete query.maxpop;
            query["population"] = { "$lte": parseInt(req.query["maxpop"]) };
        }
        
        if (Object.keys(req.query).includes("minter") && Object.keys(req.query).includes("maxter")) {
            delete query.minter;
            delete query.maxter;
            query["territorialExtension"] = { "$lte": parseInt(req.query["maxter"]), "$gte": parseInt(req.query["minter"]) };
        }
        else if (Object.keys(req.query).includes('minter')) {
            delete query.minter;
            query["territorialExtension"] = { "$gte": parseInt(req.query["minter"]) };
        }
        else if (Object.keys(req.query).includes("maxter")) {
            delete query.maxter;
            query["territorialExtension"] = { "$lte": parseInt(req.query["maxter"]) };
        }
        
        stats.find({ $and: [{ "country": country }, query] }).skip(offset).limit(limit).toArray((error,filteredstats) => {
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
        });
    });
    
    //POST /country-stats/
    app.post("/api/v1/country-stats", (req, res) => {
        var newStat = req.body;

        var keys = ["country", "year", "extensionOfBorders", "population", "territorialExtension"];

        for (var i = keys.length - 1; i--;) {
            if (!newStat.hasOwnProperty(keys[i]) || keys[i] == null) {
                return res.sendStatus(400); //Bad Request
            }
        }

        var countryStat = req.body.country;
        var yearStat = req.body.year;
        stats.find({ "country": countryStat, "year": yearStat }).toArray((error, companiesArray) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (companiesArray.length > 0) {
                    res.sendStatus(409);
                }
                else {
                    stats.insert(newStat);
                    res.sendStatus(201);
                }
            }
        });
    });
    //DELETE /country-stats/
    app.delete("/api/v1/country-stats", (req, res) => {
        stats.remove({});
        res.sendStatus(200); //OK
    });
    
    //PUT /country-stats/País/Año
    
     app.put("/api/v1/country-stats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        var updatedStats = req.body;

        var keys = ["country", "year", "extensionOfBorders", "population", "territorialExtension"];

        for (var i = keys.length - 1; i--;) {
            if (!updatedStats.hasOwnProperty(keys[i])) {
                return res.sendStatus(400);
            }
        }

        stats.find({ "country": country, "year": parseInt(year) }).toArray((error, filteredstats) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (req.body.country != country || req.body.year != year) {
                    res.sendStatus(400);
                }
                else {
                    if (filteredstats.length > 0) {
                        stats.update({ "country": country, "year": parseInt(year) }, updatedStats);
                        res.sendStatus(200);
                    }
                    else {
                        res.sendStatus(404);
                    }
                }
            }
        });
    });
    
    //DELETE /country-stats/France
    app.delete("/api/v1/country-stats/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        
        stats.find({ "country": country, "year": parseInt(year) }).toArray((error, filteredstats) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                if (filteredstats.length == 0) {
                    res.sendStatus(404);
                }
                else {
                    stats.deleteOne({ "country": country, "year": parseInt(year) });
                    res.sendStatus(200);
                }
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
