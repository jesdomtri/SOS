var express = require("express");

var app = express();
var countrystatsAPI = require("./country-stats-api");
var port = process.env.PORT || 8080;

var bodyParser = require("body-parser");

var path = require("path");

app.use(bodyParser.json());

const BASE_PATH = "/api";




//CONEXION A LA BASE DE DATOS
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




app.use("/", express.static(__dirname + "/public"));
app.use("/", express.static(path.join(__dirname, "public"))); // __dircountry equivale a la ruta raiz donde se esta ejecutando el jnode

//API Jesus
//var companies = [];

var companiesAPI = require("./companies-api");

companiesAPI(app, companies, BASE_PATH);


//API Antonio


countrystatsAPI(app, stats);

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
        if (error) {
            console.log("ERROR ; " + error);
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


    var keys = ["country", "year", "attacktype", "economicimpactmillions", "affectedequipments", "overallpercentage"];

    for (var i = keys.length - 1; i--;) {
        if (!newStat.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }


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
    attacks.find({ "country": country }, { "year": year }).toArray((error, filteredattacks) => {
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

    var updatedattacks = req.body;

    var keys = ["country", "year", "attacktype", "economicimpactmillions", "affectedequipments", "overallpercentage"];

    for (var i = keys.length - 1; i--;) {
        if (!updatedattacks.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }

    attacks.find({ "country": country }).toArray((error, attackfilter) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (attackfilter.length > 0) {
            attacks.updateOne({ "country": country }, { $set: updatedattacks });
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    });
});
//// DELETE /computers-attacks-stats/FRANCE
app.delete("/api/v1/computers-attacks-stats/:country", (req, res) => {

    var country = req.params.country;

    attacks.find({ "country": country }).toArray((error, filteredattacks) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredattacks.length > 0) {
            attacks.deleteOne({ "country": country });
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    });

});

app.listen(port, () => {
    console.log("Server is ready!!");
});
