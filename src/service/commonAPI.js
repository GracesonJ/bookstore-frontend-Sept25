import axios from "axios";

const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpRequest,
        url,
        data: reqBody,
        headers: reqHeader
    }
    return await axios(reqConfig).then(res => {
        return res
    }).catch(error => {
        return error
    })
}

export default commonAPI