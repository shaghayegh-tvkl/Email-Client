const imaps = require('imap-simple');
const TokenController = require('../controller/tokenController');
//const redisClient = require('../utils/tooRedis');
module.exports = new class mailController {
    constructor() {
        this.models = {
            
        }
    }

    

    async login(req,res) {

        
        console.log(typeof req.body.email)
       
        var config = {
            imap: {
                user: req.body.email,
                password: req.body.password,
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                tlsOptions: { rejectUnauthorized: false },
                authTimeout: 3000
            }
        };
         
        try{

            imaps.connect(config).then(function (connection) {
               // console.log(connection)
                TokenController.createToken(req.body.email,connection,function(error,result){
    
                    if(error){
                        res.status(402).send(error)
                    }else{
                        res.status(201).send({token : result})
                    }
                })
             
                // return connection.openBox('INBOX').then(function () {
                //     var searchCriteria = [
                //         'ALL'
                //     ];
             
                //     var fetchOptions = {
                //         bodies: ['HEADER', 'TEXT'],
                //         markSeen: false
                //     };
             
                //     return connection.search(searchCriteria, fetchOptions).then(function (results) {
                //         var subjects = results.map(function (res) {
                //             return res.parts.filter(function (part) {
                //                 return part.which === 'HEADER';
                //             })[0].body.subject[0];
                //         });
             
                //         console.log(subjects);
                //         // =>
                //         //   [ 'Hey Chad, long time no see!',
                //         //     'Your amazon.com monthly statement',
                //         //     'Hacker Newsletter Issue #445' ]
                //     });
                // });
            });
        }
        catch(err){

            console.log(err)
            res.status(402).send(err)
        }
       

        // return res.status(200).json({
        //     success: true
        // })
    }

}