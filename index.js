const express = require("express");
const app = express();
const port = 3000;

const si = require('systeminformation');
const cs = require("cpu-stat");

app.listen(port, () => {
    console.log(`listening on https: http://localhost:3000`);
})

cs.usagePercent(function (error, percent, second) {
    if (error) return console.log(error);
    app.get("/", async (req, res) => {
        res.send({
            cpuname: (await si.cpu()).brand,
            cpucore: (await si.cpu()).cores,
            cpumhz: (await si.cpu()).speedMax,
            cpuusage: percent.toFixed(2),
            ramusage: Math.round((await si.mem()).active / 1024 / 1024),
            ramtotal: Math.round((await si.mem()).total / (1024 * 1024)),
            ramfree: Math.round((await si.mem()).free / (1024 * 1024)),
            osname: (await si.osInfo()).distro,
        })
    })
})