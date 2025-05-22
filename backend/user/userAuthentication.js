const jwttokens = require('jsonwebtoken')
require('dotenv').config()
const user = require('./user')
module.exports = {

    
    stateRegex : function(input){
        stateRegex = new RegExp(/(NSW|WA|VIC|NT|QLD|TAS|SA)/)
        return stateRegex.test(input);
    },


    emailRegex: function(input){
        emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
        return emailRegex.test(input);
    },

    phoneNumberRegex : function(input){
        phoneNumberRegex = new RegExp(/[0-9]{10}/gm)
        return phoneNumberRegex.test(input);
    },

    postcodeRegex : function(input){
        postcodeRegex = new RegExp(/[0-9]{4}/gm)
        return postcodeRegex.test(input);
    },

    stringedRegex : function(input){
        nameOrCityRegex = new RegExp(/^[A-Za-z0-9]{1,25}$/);
        return nameOrCityRegex.test(input);
    },



    async inputValidatorJoinUs(req, res, db){
        return new Promise(async (resolve, reject) => {
            const inputErrors = [];
            if (module.exports.emailRegex(req.body.email)){
                try{
                    await user.getCheckUserExists(req.body.email, db);
                }
                catch(error){
                    inputErrors.push("email")
                }
            }
            else{
                inputErrors.push("email");
            }

            if (!module.exports.stateRegex(req.body.state)) inputErrors.push("state");
            if (!module.exports.emailRegex(req.body.email)) inputErrors.push("email");
            if (!module.exports.phoneNumberRegex(req.body.mobilePhone)) inputErrors.push("mobilePhone");
            if (!module.exports.postcodeRegex(req.body.postcode)) inputErrors.push("postcode");
            if (!module.exports.stringedRegex(req.body.firstName)) inputErrors.push("firstName");
            if (!module.exports.stringedRegex(req.body.lastName)) inputErrors.push("lastName");
            if (!module.exports.stringedRegex(req.body.city)) inputErrors.push("city");
            if(inputErrors.length > 0) reject(inputErrors);
            resolve();
        })

        
    },
 

    async inputValidatorLogin(req, res){
        return new Promise((resolve, reject) => {
            const inputErrors = [];
            if (!module.exports.emailRegex(req.body.email)) inputErrors.push("email");
            if (inputErrors.length > 0) reject(inputErrors)
            resolve()
        })
    },



    async generateAccessToken(userEmail, roleIndividual){
        return jwttokens.sign({email: userEmail, role: roleIndividual}, process.env.ACCESS_TOKEN , {expiresIn: '3600s'})
    },

    async generateRefreshToken(userEmail, roleIndividual){
        return jwttokens.sign({email: userEmail, role: roleIndividual}, process.env.REFRESH_TOKEN, {expiresIn: '172800s'})
    },


    
    async verifyToken(req, res, next){
        // console.log(req)
        let header = req.headers['authorization']
        const token = header && header.split(' ')[1]
        if(token == null) {res.status(401).json({message: "Error occurred during login"})}
        jwttokens.verify(token, process.env.ACCESS_TOKEN, (err) => {
            if(err) return res.status(403).json({message: "Error occurred during login"})
            req.user = jwttokens.decode(token);
            next();
        })

    },


}