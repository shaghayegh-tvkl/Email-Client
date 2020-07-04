const path = require("path")
module.exports = {
    ip: "0.0.0.0",
    port: 3000,
    path: {
        controller: path.resolve("./Controller"),
        model: path.resolve("./Model"),
           },
    jwt:
        {
            secretkey:"7827bef1-2736-4180-a540-2dfe1084a5ae"
        }    
}


