const APIRequest = async (request : any) => {
    const { url, data, isJSON, bearerToken, method } = request;
    let APIResponse : any = {
        statusCode : 200
    };
    const token = bearerToken || "";
    
    try{
        const formData = new FormData();

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        let headers : Record<string, string> = {
            "Authorization" : "Bearer " + token,
        }

        if(isJSON) headers['content-type'] = "application/json";

        let requestMethod = method || "POST";

        let options : any  = {
            method : requestMethod,
            headers 
        }

        if(requestMethod === "POST") options['body'] = isJSON ? JSON.stringify(data) : formData;

        await fetch(url, options)
        .then(response => {
            const statusCode = response.status;
            APIResponse.statusCode = statusCode;

            if(!response.ok){
                return ;
            }
            return response.json()
        })
        .then(response => {
            APIResponse = {...APIResponse, ...response};
        })
        .catch(err => {
            APIResponse = {
                status : "error",
                message : "Something went wrong 002(L)",
                statusCode : 500
            }
        })
    } catch(err){
        APIResponse = {
            status : "error",
            message : "Something went wrong 001(L)",
            httpCode : 500
        }
    }

    return APIResponse;
}

export default APIRequest;
