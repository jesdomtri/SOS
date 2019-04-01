var companiesV1 = require("./v1");

module.exports = function(app, companies, BASE_PATH) {
    companiesV1(app,companies, BASE_PATH+"/v1");
}
