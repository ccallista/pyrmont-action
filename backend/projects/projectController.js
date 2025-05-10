const project = require('./projectModel');
module.exports = {

    async getAllProjects(req, res, db) {
        try{
            // types of projects = open, closed, planned

            // db.exec(
            //     ` INSERT INTO projects(project_id, project_name, project_description, project_type, project_image, project_date)
            //         VALUES(1, 'Project4', 'Project4', 'open', 'cricket_image.png', '2024-05-15'),
            //         (2, 'Project5', 'Project5', 'closed', 'cricket_image.png', '2024-05-15'),
            //         (3, 'Project6', 'Project6', 'planned', 'cricket_image.png', '2024-05-15'),
            //         (4, 'Project7', 'Project7', 'open', 'cricket_image.png', '2024-05-15');


            //     `)
            const openProject = await project.getOpenProjects(db);
            const closedProject = await project.getClosedProjects(db);
            const plannedProject = await project.getPlannedProjects(db);
            return res.status(200).json({openProjects: openProject, closedProjects: closedProject, plannedProjects: plannedProject});

        }
        catch(error){
            return res.status(403).json({error: 'Error with the projects page'});
        }
    },

    async getIndividualProjects(project_name, res, db) {
        try{
            const getProjectIndividual = await project.getProject(db, project_name);
            res.status(200).json({project: getProjectIndividual});
        }
        catch(error){
            return res.status(403).json({error: 'Error has occurred when retrieving project'});
        }
    },

    

}