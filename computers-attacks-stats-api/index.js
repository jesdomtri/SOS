var version1 = require("./v1");
            
module.exports = function(app,attacks,BASE_PATH) {
        version1(app,attacks,BASE_PATH+"/v1");
    }