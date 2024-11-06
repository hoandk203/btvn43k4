import axios from "axios";

const addOrder= async (cart, apiKey)=>{
    try {
    const response= await axios.post(`https://api-exercise-sopi.vercel.app/api/v1/orders`,cart, {
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