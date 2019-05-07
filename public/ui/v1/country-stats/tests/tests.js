exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: ["tc01-loadData.js", "tc02-newStat.js", "tc03-deleteStat.js"]
}
