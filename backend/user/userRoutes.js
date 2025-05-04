const userController = require('./userController') 
const router = require('express').Router();

router.post('/api/submitForm', function(req, res){
    userController.register(req, res, req.db);
})
    
router.post('/api/login', function(req, res){
    userController.login(req, res, req.db);
})
    


module.exports = router;
