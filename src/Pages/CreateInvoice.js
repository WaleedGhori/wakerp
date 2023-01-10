import React, { useContext, useState, useEffect } from 'react'
import ProductContext from '../context/product/ProductContext'
import { json, useParams } from "react-router-dom"
import { CartProvider, useCart } from "react-use-cart";


const CreateInvoice = () => {
  const context = useContext(ProductContext)
  const { createCustomerInvocie } = context;
  // const { id } = useParams()
  const { addItem } = useCart();

  // const [invoice, setInvoice] = useState({cus_name:"", p_Id:"", p_name:"", pro_quantity:""})
  const [cus_name, setCusName] = useState("")
  const [p_Id, setProductId] = useState("")
  const [p_name, setProductName] = useState("")
  const [pro_quantity, setProductQuantity] = useState("")
  const [cart, setCart] = useState({})
  const [subtotal, setSubtotal] = useState(0);


  const handleChange = async (e) => {
    if (e.target.name == "cus_name") {
      setCusName(e.target.value)
    }
    else if (e.target.name == "p_Id") {
      setProductId(e.target.value)
    }
    else if (e.target.name == "p_name") {
      setProductName(e.target.value)
    }
    else if (e.target.name == "pro_quantity") {
      setProductQuantity(e.target.value)
    }
    // setInvoice({ ...invoice,[e.target.value]:e.target.name })
    console.log(e);
  }

  //this is a save cart function
  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].p_price * myCart[keys[i]].pro_quantity
    }
    setSubtotal(subt)
    // console.log(cart);
  }

  // add cart
  const addToCart = (p_Id, P_sale,p_company,p_exsale,p_name,p_price ,cus_name,pro_quantity) => {
    let newCart = cart;
    if (cus_name in cart) {
      newCart[cus_name].pro_quantity = cart[cus_name].pro_quantity + pro_quantity;
    }
    else {
      newCart[cus_name] = {p_Id, P_sale,p_company,p_exsale,p_name,p_price ,cus_name,pro_quantity:1}
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const handleClick = async (e) => {
    e.preventDefault();
    // first WE fetch the product according to product id
    let id = p_Id;
    let a = await fetch(`http://localhost:5000/api/product/getproduct/${id}`)
    let res = await a.json();

    addToCart(
      cus_name,
      p_Id,
      cart.P_sale,
      cart.p_company,
      cart.p_exsale,
      cart.p_name,
      cart.p_price,
      pro_quantity,);
    console.log(res);
    console.log("this is a cart",cart);
    alert("rtsdvfsdgh")
  }
  // useEffect(() => {
  //   const existingObjects = JSON.parse(localStorage.getItem('cart'));
  //   localStorage.setItem(
  //     'objects',
  //     JSON.stringify({ ...existingObjects, ...cart })
  //     );

  // }, [cart]);


  return (
    <div className='container'>
      <h2 className='text-4xl mt-2 mb-4'>Create a Invoice</h2>
      <div>
        <div className="mb-3 flex flex-col">
          <label for="product name" className="form-label">Customer Name</label>
          <input type="text" className="form-control border-2 border-slate-200 rounded mt-2" id="productname" value={cus_name} name="cus_name" onChange={handleChange} />
        </div>
      </div>
      <form>
        <div className='flex'>
          <div className='flex w-1/2'>
            <div className="mb-3 flex flex-col w-1/3 m-auto">
              <label for="product name" className="form-label">Product ID</label>
              <input type="number" className="form-control border-2 border-slate-200 rounded mt-2" id="productname" value={p_Id} name="p_Id" onChange={handleChange} />
            </div>
            <div className="mb-3 flex flex-col w-3/5 m-auto">
              <label for="productcategory" className="form-label">Product Name</label>
              <input type="text" className="form-control border-2 border-slate-200 rounded mt-2" id="productcategory" value={p_name} name="p_name" onChange={handleChange} />
            </div>
          </div>
          <div className='flex w-1/2'>
            <div className="mb-3 flex flex-col w-3/5 m-auto">
              <label for="product name" className="form-label">Product Qunatity</label>
              <input type="number" className="form-control border-2 border-slate-200 rounded mt-2" id="productname" value={pro_quantity} name="pro_quantity" onChange={handleChange} />
            </div>
            <div className="mb-3 flex flex-col w-1/3 m-auto">
              <button type="submit" className="btn addcolor px-2 py-1 text-white rounded mt-2" onClick={handleClick}>Add Product</button>
            </div>
          </div>
        </div>
      </form>
      <div className='flex border-2 overflow-x-scroll mt-4'>
        <div className='table w-full p-2'>
          <table className='w-full border' >
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className='p-2 border-r cursor-pointer text-sm font-thin text-gray-500'>Product ID</th>
                <th className='p-2 border-r cursor-pointer text-sm font-thin text-gray-500'>Product Name</th>
                <th className='p-2 border-r cursor-pointer text-sm font-thin text-gray-500'>Product Company</th>
                <th className='p-2 border-r cursor-pointer text-sm font-thin text-gray-500'>Product Price</th>
                <th className='p-2 border-r cursor-pointer text-sm font-thin text-gray-500'>Product Quantity</th>
                <th className='p-2 border-r cursor-pointer text-sm font-thin text-gray-500'>Product Discount%</th>
                <th className='p-2 border-r cursor-pointer text-sm font-thin text-gray-500'>Product Ex Discount%</th>
                <th className='p-2 border-r cursor-pointer text-sm font-thin text-gray-500'>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-r">
                  <input type="text" class="border p-1" />
                </td>
                <td className="p-2 border-r">
                  <input type="text" class="border p-1" />
                </td>
                <td className="p-2 border-r">
                  <input type="text" class="border p-1" />
                </td>
                <td className="p-2 border-r">
                  <input type="text" class="border p-1" />
                </td>
                <td className="p-2 border-r">
                  <input type="text" class="border p-1" />
                </td>
                <td className="p-2 border-r">
                  <input type="text" class="border p-1" />
                </td>
                <td className="p-2 border-r">
                  <input type="text" class="border p-1" />
                </td>
                <td className="p-2 border-r">
                  <input type="text" class="border p-1" />
                </td>
              </tr>
              <tr class="bg-gray-100 text-center border-b text-sm text-gray-600">
                <td class="p-2 border-r">2</td>
                <td class="p-2 border-r">Adam Smith</td>
                <td class="p-2 border-r">adam@gmail.com</td>
                <td class="p-2 border-r">Sydney, Australia</td>
                <td class="p-2 border-r">Sydney, Australia</td>
                <td class="p-2 border-r">Sydney, Australia</td>
                <td class="p-2 border-r">Sydney, Australia</td>
                <td>
                  <a href="#" class="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin">Edit</a>
                  <a href="#" class="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin">Remove</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default CreateInvoice


