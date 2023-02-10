import React, { useContext, useState, useEffect } from 'react'
import ProductContext from '../context/product/ProductContext'


const CreateInvoice = (props) => {
  // const context = useContext(ProductContext)
  // const { addToCart } = context;


  // const addToCart = (p_Id, P_sale,p_company,p_exsale,p_name,p_price ,cus_name,pro_quantity) => {
  //   let newCart = cart;
  //   if (cus_name in cart) {
  //     newCart[cus_name].pro_quantity = cart[cus_name].pro_quantity + pro_quantity;
  //   }
  //   else {
  //     newCart[cus_name] = {p_Id, P_sale,p_company,p_exsale,p_name,p_price ,cus_name,pro_quantity:1}
  //   }
  //   setCart(newCart)
  //   saveCart(newCart)
  // }

  // ******* This is section where we add the product in localstorage and get from api coressponding to product id

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // first WE fetch the product according to product id
  //   // let id = p_Id;
  //   // let a = await fetch(`http://localhost:5000/api/product/getproduct/${id}`)
  //   // let res = await a.json();
  //   // console.log(res);
  //   // setProducts([...products, res]);
  //   // localStorage.setItem("products", JSON.stringify([...products, res]));
  //   localStorage.setItem("product" , product)
  //   alert("Invoice")
  // }

//**** This section is our starting section of code ***//
  const [cus_name, setCusName] = useState("")
  const [p_Id, setProductId] = useState("")
  const [p_name, setProductName] = useState("")
  const [pro_quantity, setProductQuantity] = useState('')
  const [product, setProduct] = useState([])
  const [subtotal, setSubtotal] = useState(0);

//***********/This is a handle change function which help us to take the value from/*********//
const handleChange = async (e) => {
  if (e.target.name ===  "cus_name") {
    setCusName(e.target.value)
  }
  else if (e.target.name === "p_Id") {
    setProductId(e.target.value)
  }
  else if (e.target.name === "p_name") {
    setProductName(e.target.value)
  }
  else if (e.target.name ==="pro_quantity") {
    setProductQuantity(e.target.value)
  }
  // setInvoice({ ...invoice,[e.target.value]:e.target.name })
}

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
// Here we fetch the function 
  const fetchfunction = async()=>{
    let id = p_Id
    let a = await fetch(`http://localhost:5000/api/product/getproduct/${id}`)
    let res = await a.json();
    setProduct(res)
    console.log("This is a response",res);
  }

  useEffect(() => {
    fetchfunction();   
  }, [p_Id])

// Here we set the product and all user input data into localstorage
  const addProductToLocalStorage = (P_sale, p_company, p_name , p_exsale, p_price,p_quantity , cus_name , p_Id , pro_quantity) => {
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    const newProduct = { P_sale, p_company, p_name , p_exsale, p_price,p_quantity , cus_name , p_Id , pro_quantity};
    localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]));
  };  

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
              <button type="submit" className="btn addcolor px-2 py-1 text-white rounded mt-2" onClick={() => addProductToLocalStorage(product.P_sale, product.p_company, product.p_name , product.p_exsale, product.p_price,product.p_quantity , cus_name , p_Id , pro_quantity )} >Add Product</button>
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
                <td className="p-2 border-r">
                  <input type="text" className="border p-1" />
                </td>
              </tr>
              {products.map((product, index) => (
                 <tr key={index} className="bg-gray-100 text-center border-b text-sm text-gray-600">         
                 <td className="p-2 border-r">{product.p_Id}</td>
                 <td className="p-2 border-r">{product.p_name}</td>
                 <td className="p-2 border-r">{product.p_company}</td>
                 <td className="p-2 border-r">{product.p_price}</td>
                 <td className="p-2 border-r">{product.pro_quantity}</td>
                 <td className="p-2 border-r">{product.P_sale}</td>
                 <td className="p-2 border-r">{product.p_exsale}</td>
                 <td>
                   <a href="#" className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin">Edit</a>
                   <a href="#" className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin">Remove</a>
                   </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
export default CreateInvoice


// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [customerName, setCustomerName] = useState('');
//   const [productId, setProductId] = useState('');
//   const [productQuantity, setProductQuantity] = useState('');

//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
//     setProducts(storedProducts);
//   }, []);

//   useEffect(() => {
//     fetch(`https://api.example.com/products/${productId}`)
//       .then(res => res.json())
//       .then(data => setProducts([data]));
//   }, [productId]);

//   const addProductToLocalStorage = () => {
//     const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
//     const newProduct = { customerName, productId, productQuantity };
//     localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]));
//     setCustomerName('');
//     setProductId('');
//     setProductQuantity('');
//   };

//   const deleteProductFromLocalStorage = productIdToDelete => {
//     const updatedProducts = products.filter(
//       product => product.productId !== productIdToDelete
//     );
//     localStorage.setItem('products', JSON.stringify(updatedProducts));
//     setProducts(updatedProducts);
//   };

//   const updateProductInLocalStorage = (productIdToUpdate, updatedProduct) => {
//     const updatedProducts = products.map(product => {
//       if (product.productId === productIdToUpdate) {
//         return { ...product, ...updatedProduct };
//       }
//       return product;
//     });
//     localStorage.setItem('products', JSON.stringify(updatedProducts));
//     setProducts(updatedProducts);
//   };

//   return (
//     <div>
//       <h1>Products</h1>
//       <form onSubmit={addProductToLocalStorage}>
//         <label>
//           Customer Name:
//           <input
//             type="text"
//             value={customerName}
//             onChange={e => setCustomerName(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Product ID:
//           <input
//             type="text"
//             value={productId}
//             onChange={e => setProductId(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Product Quantity:
//           <input
//             type="text"
//             value={productQuantity}
//             onChange={e => setProductQuantity(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Add Product to Local Storage</button>
//       </form>
//       <ul>
//         {products.map(product => (
//           <li key={product.productId}>
//             {product.customerName} - {product.productId} - {product.productQuantity}
//             <