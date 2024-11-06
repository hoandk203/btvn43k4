import axios from "axios";

const fetchProducts= async (apiKey)=>{
    try {
        const response= await axios.get(`https://api-exercise-sopi.vercel.app/api/v1/products?limit=8`, {
            headers: {
                "X-Api-Key": apiKey
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        return error.message || "Something went wrong"
    }
}

export {fetchProducts}