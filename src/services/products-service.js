import axios from "axios";

const SERVER_API= import.meta.env.VITE_SERVER_API

const fetchProducts= async (apiKey)=>{
    try {
        const response= await axios.get(`${SERVER_API}/products?limit=8`, {
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