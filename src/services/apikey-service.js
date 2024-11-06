import axios from "axios";

const fetchApiKey= async (email)=>{
    try {
        const response= await axios.get(`https://api-exercise-sopi.vercel.app/api/v1/api-key?email=${email}`)
        return response.data
    } catch (error) {
        console.log(error);
        return error.message || "Something went wrong"
    }

}

export {fetchApiKey}