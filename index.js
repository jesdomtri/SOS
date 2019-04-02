var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
var path = require("path");
app.use(bodyParser.json());
const BASE_PATH = "/api";

var companiesAPI = require("./companies-api");
var countrystatsAPI = require("./country-stats-api");
var attacksAPI= require("./computers-attacks-stats-api");


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
    companiesAPI(app, companies, BASE_PATH);
    countrystatsAPI(app, stats, BASE_PATH);
    attacksAPI(app,attacks,BASE_PATH);
});

app.use("/", express.static(path.join(__dirname, "public"))); // __dircountry equivale a la ruta raiz donde se esta ejecutando el jnode


app.listen(port, () => {
    console.log("Server is ready!!");
});
