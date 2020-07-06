const imaps = require('imap-simple');
const TokenController = require('../controller/tokenController');
const CircularJSON = require('circular-json');
var Email = require('../model/email');
var htmlToText = require('html-to-text');
var jsdom = require('jsdom')
const { JSDOM } = jsdom;
//var chilkat = require('@chilkat/ck-node11-win64')
//const redisClient = require('../utils/tooRedis');
module.exports = new class mailController {
    constructor() {
        this.models = {

        }
    }



    async login(req, res) {


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

        try {

            imaps.connect(config).then(function (connection) {
                console.log(JSON.stringify(config.imap))
                TokenController.createToken(req.body.email, JSON.stringify(config.imap), function (error, result) {

                    if (error) {
                        res.status(402).send(error)
                    } else {
                        res.status(201).send({ token: result })
                    }
                })
            });
        }
        catch (err) {
            console.log(err)
            res.status(402).send(err)
        }
    }
    async showInbox(req, res) {

        if (req.headers['authorization']) {
            const bearerHeader = req.headers['authorization']
            TokenController.checkToken(bearerHeader, function (err, token_check_result) {
                if (err) {
                    res.status(401).send({
                        success: false
                    });
                } else {
                    console.log(token_check_result)

                    imaps.connect(token_check_result).then(function (connection) {
                        return connection.openBox('INBOX').then(function () {
                            var searchCriteria = [
                                'ALL'
                            ];

                            var fetchOptions = {
                                bodies: ['HEADER', 'TEXT'],
                                markSeen: false
                            };

                            var emails = []
                            return connection.search(searchCriteria, fetchOptions).then(function (results) {
                        
                               for(var j=0;j<results.length;j++){
                                   //console.log(results[j])
                                   var seenStatus = true
                                   if(results[j].attributes.flags.length == 0){
                                    seenStatus = false
                                   }
                                   var email = {
                                       from: results[j].parts[1].body.from[0],
                                       to: results[j].parts[1].body.to,
                                       subject: results[j].parts[1].body.subject[0],
                                       date: results[j].parts[1].body.date[0],
                                       seen: seenStatus,
                                       text: (results[j].parts[0].body),
                                   }
                                   emails.push(email)
                                     if(emails.length == results.length){
                                        res.status(201).send(emails)
                                    }
                               }
                            });
                        });
                    })

                }

            })

        }
    }

}