import api from "../../../services/api"

const projectsAPI = {    
    viewProjects(){
        return api.get("/api/getAllProject");
    },
    
    getIndividualProjects(projectName){
        return api.get("/api/projects/" + projectName);
    }
}

export default projectsAPI;