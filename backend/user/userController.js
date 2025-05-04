
const user = require('./user');

module.exports = {
    
    async register(req, res, db) {
        try{
            const hashedPassword = await user.hashPassword(req.body.password);
            userDetails = [req.body.email, hashedPassword, req.body.firstName, req.body.lastName, req.body.mobilePhone, req.body.areaOfInterest, req.body.streetName, req.body.city, req.body.state, req.body.postcode]
            await user.createUser(userDetails, db);
            res.status(200).json({ message: 'User Inserted successfully.'});
        }
        catch(error){
            return res.status(403).json({message: 'Error has occurred when registering'});
        }
    },

    async login(req, res, db) {
        try{
            const userEmailInput = req.body.email;
            const userPasswordInput = req.body.password;
            userInfo = await user.getUser(userEmailInput, db);
            userChecker = await user.getCheck(userEmailInput, userPasswordInput, userInfo.email, userInfo.password);
            return res.status(200).json({message: 'Successfully searched'});

        }
        catch(error){
            return res.status(403).json({message: 'Error occurred during login'});
        }
    }

};

