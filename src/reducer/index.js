import productsReducer from "./productsReducer"
import cartReducer from "./cartReducer"

const initialState= {
    products: [],
    cart: [],
}

const reducer= (state, action)=>{
    return {
        ...state,
        products: productsReducer(state.products, action),
        cart: cartReducer(state.cart, action),
    }
    
}

export default reducer
export {initialState}