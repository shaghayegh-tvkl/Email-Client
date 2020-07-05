const path = require("path")

    let configJson = {
        ip: "0.0.0.0",
        port: 3000,
        path: {
            controller: path.resolve("./controller"),
            model: path.resolve("./model"),
               },
        redis : "",
        port: 6379       
    }   

module.exports = configJson;

