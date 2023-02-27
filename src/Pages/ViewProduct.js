import React, { useEffect, useState } from 'react'

const ViewProduct = () => {
  const [products, setProducts] = useState([])

  const fetchProduct = async () => {
    let a = await fetch(`http://localhost:5000/api/product/getproduct`);
    let res = await a.json()
    setProducts(res)
  }
  useEffect(() => {
    fetchProduct()
  }, [])
  useEffect(() => {
  }, [products])

  return (
    <div className='container'>
      <h2 className='text-4xl mt-2 mb-4'>View Product</h2>
      <hr className='mb-6'></hr>
      <div className='flex border-2 overflow-x-scroll mt-4 overflow-y-scroll'>
        <table className="w-full border ">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                Product ID
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                Product Name
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                Product Company
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                Product Price
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                Product Quantity
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                Product Discount%
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                Product Ex Discount%
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-r">
                <input type="text" className="border p-1" />
              </td>
              <td className="p-2 border-r">
                <input type="text" className="border p-1" />
              </td>
              <td className="p-2 border-r">
                <input type="text" className="border p-1" />
              </td>
              <td className="p-2 border-r">
                <input type="text" className="border p-1" />
              </td>
              <td className="p-2 border-r">
                <input type="text" className="border p-1" />
              </td>
              <td className="p-2 border-r">
                <input type="text" className="border p-1" />
              </td>
              <td className="p-2 border-r">
                <input type="text" className="border p-1" />
              </td>
            </tr>
            {products.length === 0 ? (<p>Wait...</p>) : (products.map((product, index) => (
              <tr
                key={index}
                className="bg-gray-100 text-center border-b text-sm text-gray-600"
              >
                <td className="p-2 border-r">{product.p_Id}</td>
                <td className="p-2 border-r">{product.p_name}</td>
                <td className="p-2 border-r">{product.p_company}</td>
                <td className="p-2 border-r">{product.p_price}</td>
                <td className="p-2 border-r">{product.p_quantity}</td>
                <td className="p-2 border-r">{product.P_sale}</td>
                <td className="p-2 border-r">{product.p_exsale}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewProduct