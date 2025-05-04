const server = "http://localhost:5000";


const api = {
    async get(endpoint){
        try{
            const response = await fetch(server + "/" + endpoint);
            return response;

        }
        catch(error){
            console.error('Error caused from GET Request: ' + error)
        }
    },

    async post(endpoint, data){
        try{
            const response = await fetch(server + "/" + endpoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify(data),
                
            });
            return response;

        }
        catch(error){
            console.error('Error caused from POST Request:' + error)
        }
    }
}

export default api;
