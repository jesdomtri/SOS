module.exports =function ( app , attacks , BASE_PATH){

//GET /api/v1/computers-attacks-stats/docs
app.get(BASE_PATH+"/computers-attacks-stats/docs/", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6899262/S17oyWAv");
});
// ruta /api/v1/computers-attacks-stats/loadInitialData que al hacer un GET cree 2 o más recursos.

app.get(BASE_PATH+"/computers-attacks-stats/loadInitialData", (req, res) => {

    var computersattacksstats = [{
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
            country: "EEyU",
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

 app.get(BASE_PATH + "/computers-attacks-stats", (req, res) => {
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

       attacks.find(query).skip(offset).limit(limit).toArray((error, attackArray) => {
            if (error) {
                console.log("Error: " + error);
            }
            else {
                attackArray.forEach(function(e) {
                    delete e._id;
                });
                res.send(attackArray);
            }
        });
    });
    
//// POST /computers-attacks-stats/
    app.post(BASE_PATH+"/computers-attacks-stats", (req, res) => {
        var newStat = req.body;
        var countryattack = req.body.country;
        var year = req.body.year;
    
    
        var keys = ["country", "year", "attacktype", "economicimpactmillions", "affectedequipments", "overallpercentage"];
    
        for (var i = keys.length - 1; i--;) {
            if (!newStat.hasOwnProperty(keys[i])) {
                return res.sendStatus(400);
            }
        }
    
    
        attacks.find({ "country": countryattack ,"year" : parseInt(year)}).toArray((error, attacksArray) => {
            if (error) {
                console.log("Error: " + error);
            }else {
                
           
                if (attacksArray.length > 0) {
                    res.sendStatus(409);
                }
                else {
                    attacks.insert(newStat);
                    res.sendStatus(201);
                }
                
            }
        });
    
    });
    
    //// PUT
    app.put(BASE_PATH+"/computers-attacks-stats", (req, res) => {
        res.sendStatus(405);
    });
    
    //// DELETE /computers-attacks-stats/
    app.delete(BASE_PATH+"/computers-attacks-stats", (req, res) => {
        attacks.remove({});
        res.sendStatus(200);
    });
    
    //// GET /computers-attacks-stats/FRANCE
    app.get(BASE_PATH+"/computers-attacks-stats/:country", (req, res) => {
        var country = req.params.country;
   

    attacks.find({ "country": country }).toArray((error, filteredattacks) => {
        if (error) {
            console.log("Error: " + error);
        }else{
            if (filteredattacks.length >= 1) {
                filteredattacks.forEach((e) =>{
                    delete e._id;
                });
                res.send(filteredattacks[0]);
            }
            else {
                res.sendStatus(404);
            }
    }
});
});

app.get(BASE_PATH+"/computers-attacks-stats/:country/:year", (req, res) => {
    var country = req.params.country;
    var year  = req.params.year;
    
     attacks.find({ "country": country , "year" : parseInt(year) }).toArray((error, filteredattacks) => {
            
            if (error) {
                    console.log("Error: " + error);
             }else{ 
                 if(filteredattacks.length >= 1) {
                    
                    filteredattacks.forEach((e) =>{
                        delete e._id;
                    });
                    
                    res.send(filteredattacks[0]);
                }
                     
                 
                      else {
                    res.sendStatus(404);
                         }
                 }
           
        });

});
app.get(BASE_PATH+"/computers-attacks-stats/:country/:year/:attacktype", (req, res) => {
    var country = req.params.country;
    var year  = req.params.year;
    var attacktype=req.params.attacktype;
    
    
     attacks.find({ "country": country , "year" : parseInt(year) ,"attacktype" : attacktype}).toArray((error, filteredattacks) => {
            
               if (error) {
                    console.log("Error: " + error);
                }
                else{
                    if (filteredattacks.length >= 1) {
                    filteredattacks.forEach( (e) =>{
                        delete e._id;
                    });
                    res.send(filteredattacks[0]);
                 }else {
                    res.sendStatus(404);
                }
                
                }
        });

});
//// POST 
app.post(BASE_PATH+"/computers-attacks-stats/:country", (req, res) => {
    res.sendStatus(405);
});
//// PUT /computers-attacks-stats/FRANCE
app.put(BASE_PATH+"/computers-attacks-stats/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    var updatedattacks = req.body;

    var keys = ["country", "year", "attacktype", "economicimpactmillions", "affectedequipments", "overallpercentage"];

    for (var i = keys.length - 1; i--;) {
        if (!updatedattacks.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }

    attacks.find({ "country": country , "year" : parseInt(year) }).toArray((error, attackfilter) => {
        if (error) {
            console.log("Error: " + error);
        }else{
            
            if (attackfilter.length > 0) {
                attacks.update({ "country": country ,"year": parseInt(year)},  updatedattacks );
                res.sendStatus(200);
            }
            else {
                res.sendStatus(404);
            }
        }
    });
});
//// DELETE /computers-attacks-stats/FRANCE
app.delete(BASE_PATH+"/computers-attacks-stats/:country/:year", (req, res) => {

    var country = req.params.country;
    var year  = req.params.year;

    attacks.find({ "country": country , "year": parseInt(year)}).toArray((error, filteredattacks) => {
        if (error) {
            console.log("Error: " + error);
        }else{
            
       
            if (filteredattacks.length > 0) {
                attacks.deleteOne({ "country": country, "year" : parseInt(year) });
                res.sendStatus(200);
            }
            else {
                res.sendStatus(404);
            }
        }
    });
    
    });
    
    app.put(BASE_PATH+"/computers-attacks-stats/:country",(req,res) =>{
       
       
       res.sendStatus(405);
        
    });
 
    app.put(BASE_PATH+"/computers-attacks-stats/:year",(req,res) =>{
       
       
       res.sendStatus(405);
        
    });
    
    app.put(BASE_PATH+"/computers-attacks-stats/:attacktype",(req,res) =>{
       
       
       res.sendStatus(405);
        
    });
     app.put(BASE_PATH+"/computers-attacks-stats/:economicimpactmillions",(req,res) =>{
       
       
       res.sendStatus(405);
        
    });
    
    app.put(BASE_PATH+"/computers-attacks-stats/:affectedequipments",(req,res) =>{
       
       
       res.sendStatus(405);
        
    });
    
    
    
     app.put(BASE_PATH+"/computers-attacks-stats/:overallpercentage",(req,res) =>{
       
       
       res.sendStatus(405);
        
    });
    
    
    
    
};