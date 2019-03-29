var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
var path = require("path");
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://paco:paco@sos181903-tlda3.mongodb.net/sos181903?retryWrites=true";
var companies;
var stats;
var attacks;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(error => {
    companies = client.db("sos181903").collection("companies");
    stats = client.db("sos181903").collection("country-stats");
    attacks = client.db("sos181903").collection("computers-attacks-stats");
    console.log("Connected to database.");

});


app.use("/", express.static(path.join(__dirname, "public"))); // __dircountry equivale a la ruta raiz donde se esta ejecutando el jnode

//API Jesus
//var companies = [];

//GET /api/v1/companies/docs
app.get("/api/v1/companies/docs/", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/7046928/S17tPnEJ");
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
    companies.find({}).toArray((error, companiesArray) => {
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
    companies.find({ "country": countryCompany }).toArray((error, companiesArray) => {
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




//API Antonio

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


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////////API JOAQUÍN////////////////////////// 
var computersattacksstats = [];

//GET /api/v1/computers-attacks-stats/docs
app.get("/api/v1/computers-attacks-stats/docs/", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6899262/S17oyWAv");
});
// ruta /api/v1/computers-attacks-stats/loadInitialData que al hacer un GET cree 2 o más recursos.

app.get("/api/v1/computers-attacks-stats/loadInitialData", (req, res) => {

    computersattacksstats = [{
            country: "France",
            year: 2017,
            attacktype: "ransomware",
            economicimpactmillions: 7.9,
            affectedequipments: 47808,
            overallpercentage: 13.28
        },
        {
            country: "UK",
            year: 2017,
            attacktype: "ransomware",
            economicimpactmillions: 8.74,
            affectedequipments: 52920,
            overallpercentage: 14.7
        },
        {
            country: "Japan",
            year: 2017,
            attacktype: "ransomware",
            economicimpactmillions: 10.45,
            affectedequipments: 63252,
            overallpercentage: 17.57
        },
        {
            country: "Germany",
            year: 2017,
            attacktype: "ransomware",
            economicimpactmillions: 11.15,
            affectedequipments: 67500,
            overallpercentage: 18.75
        },
        {
            country: "EEUU",
            year: 2017,
            attacktype: "ransomware",
            economicimpactmillions: 21.22,
            affectedequipments: 128088,
            overallpercentage: 35.58
        }

    ];
    attacks.find({}).toArray((error, attacksArray) => {
        if(error){
            console.log("ERROR ; "+error);
        }
        if (attacksArray.length == 0) {
            attacks.insert(computersattacksstats);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(409);
        }
    });


});

//// GET /computers-attacks-stats/

app.get("/api/v1/computers-attacks-stats", (req, res) => {

    attacks.find({}).toArray((error, attacksArray) => {
        if (error) {
            console.log("Eror : " + error);
        }
        if (attacksArray.length >= 1) {
            res.send(attacksArray);
        }
        else {
            res.sendStatus(404);
        }
    });

});
//// POST /computers-attacks-stats/
app.post("/api/v1/computers-attacks-stats", (req, res) => {
    var newStat = req.body;
    var countryattack = req.body.country;
    attacks.find({ "country": countryattack }).toArray((error, attacksArray) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (attacksArray.length > 0) {
            res.sendStatus(409);
        }
        else {
            attacks.insert(newStat);
            res.sendStatus(201);
        }
    });

});

//// PUT
app.put("/api/v1/computers-attacks-stats", (req, res) => {
    res.sendStatus(405);
});

//// DELETE /computers-attacks-stats/
app.delete("/api/v1/computers-attacks-stats", (req, res) => {
    attacks.remove({});
    res.sendStatus(200);
});

//// GET /computers-attacks-stats/FRANCE
app.get("/api/v1/computers-attacks-stats/:country", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    attacks.find({ "country": country } , {"year":year}).toArray((error, filteredattacks) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredattacks.length >= 1) {
            res.send(filteredattacks);
        }
        else {
            res.sendStatus(404);
        }
    });

});
//// POST 
app.post("/api/v1/computers-attacks-stats/:country", (req, res) => {
    res.sendStatus(405);
});
//// PUT /computers-attacks-stats/FRANCE
app.put("/api/v1/computers-attacks-stats/:country", (req, res) => {
    var country = req.params.country;
    var year=req.params.country;
    var updatedStats = req.body;

    var keys = ["country", "year","attacktype","economicimpactmillions","affectedequipments","overallpercentage"];

    for (var i = keys.length - 1; i--;) {
        if (!updatedStats.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }


    attacks.find({ "country": country },{"year":year}).toArray((error, statsArray) => {
        if (error)
            console.log(error);
        if (statsArray == 0) {
            res.sendStatus(404);
        }
        else {

            attacks.updateOne({
                "country": country, "year":year
            }, {
                $set: updatedStats
            });
            res.sendStatus(200);

        }
    });
});
//// DELETE /computers-attacks-stats/FRANCE
app.delete("/api/v1/computers-attacks-stats/:country", (req, res) => {

    var country = req.params.country;
    var year = req.params.year;



    attacks.find({ "country": country, "year": year }).toArray((error, filteredattacks) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredattacks.length == 0) {
            res.sendStatus(404);
        }
        else {
            attacks.deleteOne({ "country": country, "year": year });
            res.sendStatus(200);
        }
    });

});

app.listen(port, () => {
    console.log("Server is ready!!");
});
