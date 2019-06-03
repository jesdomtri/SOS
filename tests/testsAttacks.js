exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: ["tc01-loadDataAttack.js","tc02-newAttack.js","tc03-deleteAttack.js"]
}
