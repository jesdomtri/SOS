exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: ["tc01-loadDataCompany.js", "tc02-newCompany.js"]
}
