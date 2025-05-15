const projectController = require('./projectController') 
const router = require('express').Router();

router.get('/api/getAllProject', function(req, res){
    projectController.getAllProjects(req, res, req.db);
})

router.get('/api/projects/:projectName', function(req, res){
    
    projectController.getIndividualProjects(req.params['projectName'], res, req.db)

})

    


module.exports = router;
