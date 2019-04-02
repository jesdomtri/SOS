
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

app.use("/", express.static(path.join(__dirname, "public"))); // __dircountry equivale a la ruta raiz donde se esta ejecutando el jnode


//CONEXION A LA BASE DE DATOS

var companies;
var stats;
var attacks;
    

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://paco:paco@sos181903-tlda3.mongodb.net/sos181903?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });


client.connect(error => {
   
    companies = client.db("sos181903").collection("companies");
    stats = client.db("sos181903").collection("country-stats");
    
    console.log("Connected to database Jesus .");
    
        const uriJoaquin = "mongodb+srv://joapuemar:NaRanJa94_@sos1819-jpm-1od50.mongodb.net/test?retryWrites=true";
        const clientJoaquin = new MongoClient(uriJoaquin, { useNewUrlParser: true });
      
        clientJoaquin.connect(error => {
           
            attacks = clientJoaquin.db("sos181903-jpm").collection("computers-attacks-stats");
                     
                       console.log("Connected to database Joaquín .");
                       
                            
        companiesAPI(app, companies, BASE_PATH);
        countrystatsAPI(app, stats, BASE_PATH);
        attacksAPI(app,attacks,BASE_PATH);
        
            app.listen(port, () => {
            console.log("Server is ready!!");
        }); // Debe dejarse la conexión a la aplicacón dentro ya que si queda afuera puede que se inicie la aplicación pero no la base de datos .
                      
                        });
       });





