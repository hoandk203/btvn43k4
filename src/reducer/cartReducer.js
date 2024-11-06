const cartReducer= (state, action)=>{
    switch (action.type) {
        case "cart/add":
            return [...action.payload]
        case "cart/load":
            return [...action.payload]
        default:
            return state
    }
}

export default cartReducer;