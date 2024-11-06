const productsReducer= (state, action)=>{
    
    switch (action.type) {
        case "products/fetch":
            return [...action.payload]
    
        default:
            return state
    }
}

export default productsReducer