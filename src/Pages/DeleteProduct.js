import React,{useState, useEffect, useContext} from 'react'
import ProductContext from '../context/product/ProductContext'
const DeleteProduct = () => {
  
  const context = useContext(ProductContext)
  const {deleteProduct} = context;

  const [productid, setProductId] = useState()
  const [deleteprod, setDeleteProd] = useState()
  const handleChange = e =>{
    setProductId(e.target.value)
  }

  const handleDelete = async(e) =>{
    e.preventDefault()
    let id  = productid
    let a = await fetch(`http://localhost:5000/api/product/getproduct/${id}`);
    let res = await a.json();
    setDeleteProd(res)
    console.log(res);
    console.log("I am a delete prod",deleteprod)
//    console.log("this is a update",updateproduct);
}
// const [product, setproduct] = useState({p_Id:"",p_name:"",p_category:"",p_company:"",p_quantity:"",p_price:"",P_sale:"",p_exsale:""});

useEffect(() => {
}, [deleteprod])

const handleDelProd = () =>{
  const confirmed = window.confirm("Are you sure you want to delete this product?");
  if (confirmed) {
    deleteProduct(productid)
    alert("Product Deleted")
    window.location.reload(true);
  }
}

  return (
    <div className='container'>
      <h2 className='text-4xl mt-2 mb-4'>Delete Product</h2>
      <div className=''>
        <label className='my-2 font-semibold t text-lg'>Enter a product Id for Delete: </label>
        <input type='number' name='p_Id' value={productid} onChange={handleChange} className='m-2 p-1 border-2 border-slate-200 rounded'/>
        <button onClick={handleDelete} className='bg-slate-900 text-white m-2 p-1 px-4 rounded'>Find Product</button>
    </div>
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
                {!deleteprod?(<p>Wait...</p>):(<tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                  <td className="p-2 border-r">{deleteprod.p_Id}</td>
                  <td className="p-2 border-r">{deleteprod.p_name}</td>
                  <td className="p-2 border-r">{deleteprod.p_company}</td>
                  <td className="p-2 border-r">{deleteprod.p_price}</td>
                  <td className="p-2 border-r">{deleteprod.p_quantity}</td>
                  <td className="p-2 border-r">{deleteprod.P_sale}</td>
                  <td className="p-2 border-r">{deleteprod.p_exsale}</td>
                </tr>)}
            </tbody>
          </table>
    </div>
    <button type="submit" className="btn addcolor p-2 text-white rounded mt-2" onClick={handleDelProd}>Delete Product</button>

    </div>
  )
}

export default DeleteProduct