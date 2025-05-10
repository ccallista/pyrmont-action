import api from "../../../services/api"

const projectsAPI = {    
    viewProjects(){
        return api.get("/api/getAllProject");
    }
}

export default projectsAPI;