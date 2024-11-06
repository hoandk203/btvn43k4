import axios from "axios";

const SERVER_API= import.meta.env.VITE_SERVER_API

const fetchApiKey= async (email)=>{
    try {
        const response= await axios.get(`${SERVER_API}/api-key?email=${email}`)
        return response.data
    } catch (error) {
        console.log(error);
        return error.message || "Something went wrong"
    }

}

export {fetchApiKey}