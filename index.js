var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");
var cors = require("cors");

const BASE_PATH = "/api";

var app = express();

//PROXY A LA API UEFA COUNTRY RANKINGS
var pathsUCR = '/proxyUefaCountryRankings';
var remoteAPIUCR = 'https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings';
app.use(pathsUCR, function(req, res) {
    console.log('piped: ' + remoteAPIUCR);
    req.pipe(request(remoteAPIUCR)).pipe(res);
});
//FIN PROXY A LA API UEFA COUNTRY RANKINGS

//PROXY A LA API BEER CONSUMED STATS
var pathsBCS = '/proxyBeerConsumedStats';
var remoteAPIBCS = 'https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats';
app.use(pathsBCS, function(req, res) {
    console.log('piped: ' + remoteAPIBCS);
    req.pipe(request(remoteAPIBCS)).pipe(res);
});
//FIN PROXY A LA API BEER CONSUMED STATS

//PROXY A LA API UNEMPLOYMENT
var pathsU = '/proxyUnemployment';
var remoteAPIU = 'https://sos1819-12.herokuapp.com/api/v1/youth-unemployment-stats';
app.use(pathsU, function(req, res) {
    console.log('piped: ' + remoteAPIU);
    req.pipe(request(remoteAPIU)).pipe(res);
});
//FIN PROXY A LA API UNEMPLOYMENT

//PROXY A LA API UEFA CLUB RANKINGS
var pathsUCRS = '/proxyUefaClubRankings';
var remoteAPIUCRS = 'https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings';
app.use(pathsUCRS, function(req, res) {
    console.log('piped: ' + remoteAPIUCRS);
    req.pipe(request(remoteAPIUCRS)).pipe(res);
});
//FIN PROXY A LA API UEFA CLUB RANKINGS

//PROXY A LA API HURRICANES
var pathsH = '/proxyHurricanes';
var remoteH = 'https://sos1819-01.herokuapp.com/api/v1/hurricanes/';
app.use(pathsH, function(req, res) {
    console.log('piped: ' + remoteH);
    req.pipe(request(remoteH)).pipe(res);
});
//FIN PROXY A LA API HURRICANES

//PROXY happiness-stats 
    var pathsHa = '/proxyHappiness';
var remoteHa = 'http://sos1819-04.herokuapp.com/api/v1/happiness-stats';
app.use(pathsHa, function(req, res) {
    console.log("Happiness");
    console.log('piped: ' + remoteHa);
    req.pipe(request(remoteHa)).pipe(res);
});
// FIN PROXY 
//PROXY transfer-stats
var pathsT = '/proxyTransfer';
var remoteT = 'https://sos1819-06.herokuapp.com/api/v1/transfer-stats';
app.use(pathsT, function(req, res) {
    console.log("Happiness");
    console.log('piped: ' + remoteT);
    req.pipe(request(remoteT)).pipe(res);
});
// fin 
/// PROXY COMPANIES STAST

var pathsC = '/proxyCompanies';
var remoteC = 'https://sos1819-02.herokuapp.com/api/v1/companies-stats';
app.use(pathsC, function(req, res) {
    console.log("Companies");
    console.log('piped: ' + remoteC);
    req.pipe(request(remoteC)).pipe(res);
});
// FIN DEL PROXY 
var companiesAPI = require("./companies-api");
var countrystatsAPI = require("./country-stats-api");
var attacksAPI = require("./computers-attacks-stats-api");

app.use(bodyParser.json());
app.use(cors());

app.use("/", express.static(path.join(__dirname, "public"))); // __dircountry equivale a la ruta raiz donde se esta ejecutando el jnode


//CONEXION A LA BASE DE DATOS

var companies;
var stats;
var attacks;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://paco:paco@sos181903-tlda3.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });


client.connect(error => {

    companies = client.db("sos181903").collection("companies");

    console.log("Connected to database Jesus.");

    const MongoClient = require('mongodb').MongoClient;
    const uriJoaquin = "mongodb+srv://sos:sos@sos1819-jpm-1od50.mongodb.net/test?retryWrites=true";
    const clientJoaquin = new MongoClient(uriJoaquin, { useNewUrlParser: true });

    clientJoaquin.connect(error => {

        attacks = clientJoaquin.db("Sos-1819-JMP").collection("computers-attacks-stats");

        console.log("Connected to database Joaquín .");

        const MongoClient = require('mongodb').MongoClient;
        const urlAntonio = "mongodb+srv://root:root@sos1819-jmp-dhhii.mongodb.net/test?retryWrites=true";
        const clientAntonio = new MongoClient(urlAntonio, { useNewUrlParser: true });

        clientAntonio.connect(error => {

            stats = clientAntonio.db("sos1819-03").collection("country-stats");

            console.log("Conectado a la base de datos de Antonio");

            app.listen(port, () => {
                console.log("Server is ready!!");
            }); // Debe dejarse la conexión a la aplicacón dentro ya que si queda afuera puede que se inicie la aplicación pero no la base de datos .

            countrystatsAPI(app, stats, BASE_PATH);

        });

        attacksAPI(app, attacks, BASE_PATH);
    });

    companiesAPI(app, companies, BASE_PATH);

});
