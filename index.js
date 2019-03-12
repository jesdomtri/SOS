var express = require("express");
var app  = express();
var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname+"/public")); // __dirname equivale a la ruta raiz donde se esta ejecutando el jnode

app.get("/time" , (request,response) => {
    response.send(new Date()); 
});
app.listen(port , () => {
   console.log("Server is ready!!");
    
});