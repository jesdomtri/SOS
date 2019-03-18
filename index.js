var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
app.use(bodyParser.json());



app.use("/", express.static(__dirname + "/public")); // __dircountry equivale a la ruta raiz donde se esta ejecutando el jnode

app.use("/api/v1/companies", express.static(__dirname + "/public/companies.html"));
app.use("/api/v1/companies", require('./api/v1/companies'));

app.get("/time", (request, response) => {
    response.send(new Date());
});
app.listen(port, () => {
    console.log("Server is ready!!");

});
