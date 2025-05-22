
const user = require('./user');
const userAuth = require('./userAuthentication')

module.exports = {
    async register(req, res, db) {
        try{
            const validateUser = await userAuth.inputValidatorJoinUs(req, res);
            const hashedPassword = await user.hashPassword(req.body.password);
            userDetails = [req.body.email, hashedPassword, req.body.firstName, req.body.lastName, req.body.mobilePhone, req.body.areaOfInterest, req.body.streetName, req.body.city, req.body.state, req.body.postcode, 1]
            await user.createUser(userDetails, db);
            res.status(200).json({ message: 'User Inserted successfully.'});
        }
        catch(error){
            console.log(error);
            return res.status(403).json({message: 'Error has occurred when registering', errors : error});
        }
    },

    async login(req, res, db) {
        try{
                // db.exec(
                // `INSERT INTO roles(role_id, role_type)
                // VALUES
                //     (0, 'admin'),
                //     (1, 'member');
                //  `)
            const validateUser = await userAuth.inputValidatorLogin(req, res);
            const userEmailInput = req.body.email;
            const userPasswordInput = req.body.password;
            userInfo = await user.getUser(userEmailInput, db);
            userChecker = await user.getCheck(userEmailInput, userPasswordInput, userInfo.email, userInfo.password);
            access_token = await userAuth.generateAccessToken(userInfo.email, userInfo.role_id);
            refresh_token = await userAuth.generateRefreshToken(userInfo.email, userInfo.role_id);
            res.cookie('accessToken', access_token, {httpOnly:true, sameSite:'strict', secure: false})
            res.cookie('refreshToken', refresh_token, {httpOnly:true, sameSite:'strict', secure: false})
            return res.status(200).json({message: 'Successfully searched', role: userInfo.role_id});

        }
        catch(error){
            console.log(error)
            return res.status(403).json({message: 'Error occurred during login'});
        }
    }

};

