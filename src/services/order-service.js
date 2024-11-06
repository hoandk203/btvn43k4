import axios from "axios";

const SERVER_API= import.meta.env.VITE_SERVER_API

const addOrder= async (cart, apiKey)=>{
    try {
    const response= await axios.post(`${SERVER_API}/orders`,cart, {
        headers: {
            "X-Api-Key": apiKey
        }
    })
    return response.data

    } catch(e){
        console.log(e)
        return e.message || "Something went wrong"
    }
}

export {addOrder}