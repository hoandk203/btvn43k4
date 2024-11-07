import { useState, useContext, useEffect } from 'react'
import { ProductCard, Cart, Login } from './index'
import { fetchProducts } from '../services/products-service.js'
import {fetchApiKey} from '../services/apikey-service.js'
import {addOrder} from "../services/order-service.js";
import {getUser} from "../services/user-service.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../providers/Provider'

const Shop = () => {
    const apiKey = localStorage.getItem("apiKey")
    const { state, dispatch } = useContext(AppContext)
    const [isLoading, setIsLoading]= useState(false)

    const getUsername= async (apiKey)=>{
        const data= await getUser(apiKey)
        if(data.data){
            localStorage.setItem("username", data.data.emailId.name)
            getProducts(localStorage.getItem("apiKey"))
        }
    }

    const getProducts = async (apiKey) => {
        setIsLoading(true)
        const data = await fetchProducts(apiKey)
        if (data.data) {
            setIsLoading(false)
            toast.success(`Chào mừng ${localStorage.getItem("username")}`)
            dispatch({ type: "products/fetch", payload: data.data.listProduct })
        } else {
            setIsLoading(false)
            toast.error("Lấy dữ liệu thất bại,  vui lòng reload")
            localStorage.removeItem("apiKey")
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }

    }

    const getApiKey = async (email) => {
        setIsLoading(true)
        const data = await fetchApiKey(email)
        if (data.data) {
            setIsLoading(false)
            localStorage.setItem("apiKey", data.data.apiKey)
            getUsername(localStorage.getItem("apiKey"))

        } else {
            setIsLoading(false)
            toast.error("Email không được xác thực")
            localStorage.removeItem("apiKey")
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get('email')
        getApiKey(email)

    }

    const handleAddToCart= (currProduct)=>{
        localStorage.setItem("cart", JSON.stringify(state.cart))
        const fakeCurrProduct= {...currProduct}
        fakeCurrProduct.totalQuantity= fakeCurrProduct.quantity
        fakeCurrProduct.quantity= 1
        fakeCurrProduct.productId= fakeCurrProduct._id
        let isPush= true
        let newCart= JSON.parse(localStorage.getItem("cart"))

        newCart= newCart.map((item)=>{
            if(item._id === fakeCurrProduct._id){
                item.quantity+= 1;
                isPush= false
                return item
            }
            return item
        })
        if(isPush) newCart.push(fakeCurrProduct)

        dispatch({type: "cart/add", payload: newCart})
        toast.success("Thêm vào giỏ hàng thành công")
    }

    useEffect(() => {
        if (localStorage.getItem("apiKey")) {
            getProducts(localStorage.getItem("apiKey"))
        }
        if(localStorage.getItem("cart")){
            dispatch({type: "cart/load", payload: JSON.parse(localStorage.getItem("cart"))})
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(state.cart))
    }, [state.cart])

    const handlePayment= async ()=>{
        setIsLoading(true)
        const data= await addOrder(state.cart, apiKey)
        if(data.data){
            state.products.forEach((product) => {
                state.cart.forEach((item)=>{
                    if(product._id === item._id){
                        product.quantity -= item.quantity
                    }
                })
            })
            setIsLoading(false)
            toast.success("Thanh toán thành công")
            dispatch({type: "cart/load", payload: []})
        }else{
            setIsLoading(false)
            toast.error("Thanh toán không thành công, vui lòng reload")
            setTimeout(()=>{
                window.location.reload()
                localStorage.removeItem("apiKey")
            }, 3000)
        }
    }


    return (
        <div>
            {isLoading && <div role="status" className="absolute top-1/2 left-1/2 z-50">
                <div className="fixed inset-0 bg-black opacity-60"></div>
                <svg aria-hidden="true"
                     className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>}
            <ToastContainer autoClose={3000}/>
            {!apiKey
                ? <Login handleLogin={handleLogin}/>
                : <div className='container mx-auto bg-[#111827]'>
                    <div><h1 className='text-2xl font-bold text-center text-white'>Welcome F8-Shop</h1></div>
                    <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 p-10 justify-center'>
                        {state.products.map((product) => {
                            return <ProductCard key={product._id} product={product} handleAddToCart={handleAddToCart}/>
                        })}
                    </div>
                    <div className='p-10'>
                        <Cart cartList={state.cart}/>
                        {state.cart.length > 0 &&
                            <div>
                                <button
                                    onClick={() => handlePayment()}
                                    className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Thanh toán
                                </button>
                            </div>}
                    </div>

                </div>}

        </div>
    )
}

export default Shop