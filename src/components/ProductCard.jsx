

const ProductCard = ({ product, handleAddToCart }) => {
    return (
        <div>
            <div
                className="pb-8 relative max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
                <div>
                    <img
                        className="rounded-t-lg w-full h-[230px] object-cover"
                        src={product.image}
                        alt=""
                    />
                </div>
                <div className="p-5">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                        </h5>
                    </div>
                    <p className="mb-3 text-white font-bold">
                        ${product.price}
                    </p>
                    <button
                        onClick={()=>handleAddToCart(product)}
                        className="absolute bottom-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard