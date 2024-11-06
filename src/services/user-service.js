import axios from "axios";

const SERVER_API= import.meta.env.VITE_SERVER_API

const getUser= async (apiKey)=>{
    try {
        const response= await axios.get(`${SERVER_API}/users/profile`, {
            headers:{
                "X-Api-Key": apiKey
            }
        })
        return response.data
    } catch(e){
        console.log(e)
        return e.message || "Something went wrong"
    }

}

export {getUser}