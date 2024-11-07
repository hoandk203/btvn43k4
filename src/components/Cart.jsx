

const Cart = ({cartList}) => {
    
  return (
    <div>
        <div className="relative overflow-x-auto shadow-md border-solid border-[1px] border-white sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Tên sản phẩm
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Số lượng
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Còn lại
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tổng tiền
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                {cartList.length > 0
                    ? <tbody>
                        {Array.isArray(cartList) && cartList.map((cart) => {
                            return <tr key={cart._id}>
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {cart.name}
                                </th>
                                <td className="px-6 py-4">
                                    {cart.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {cart.totalQuantity}
                                </td>
                                <td className="px-6 py-4">
                                    {cart.price * cart.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {/*<a href="#"*/}
                                    {/*   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Xóa</a>*/}
                                </td>
                            </tr>
                        })}

                        </tbody>
                    : <tbody>
                    <tr>
                        <td colSpan="5" className="text-2xl text-center py-3">Bạn chưa có sản phẩm trong giỏ hàng</td>
                    </tr>
                    </tbody>}

            </table>
        </div>
    </div>
  )
}

export default Cart