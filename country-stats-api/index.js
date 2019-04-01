var statsV1 = require("./v1");

module.exports = function(app, stats, BASE_PATH) {
    statsV1(app, stats, BASE_PATH+"/v1");
}
