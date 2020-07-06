const path = require("path")

    let configJson = {
        ip: "0.0.0.0",
        port: 3000,
        path: {
            controller: path.resolve("./controller"),
            model: path.resolve("./model"),
               },
        jwt:
            {
                secretkey:"secret-key"
            },       
        redis : "192.168.114.158",
        redis_port: 6379       
    }   

module.exports = configJson;

