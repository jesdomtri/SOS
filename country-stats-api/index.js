var statsV1 = require("./v1");

module.exports = function(app, BASE_PATH) {
    statsV1(app, BASE_PATH+"/v1");
}
