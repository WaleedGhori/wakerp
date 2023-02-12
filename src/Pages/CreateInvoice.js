import React, { useContext, useState, useEffect } from "react";
import ProductContext from "../context/product/ProductContext";

const CreateInvoice = () => {
  //**** This section is our starting section of code ***//
  const [cus_name, setCusName] = useState("");
  const [p_Id, setProductId] = useState("");
  const [p_name, setProductName] = useState("");
  const [pro_quantity, setProductQuantity] = useState("");
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalquant, setTotalQuant] = useState(0);
  const [totalsale, setTotalSale] = useState(0);
  const [totalexsale, setTotalExSale] = useState(0);
  const [ammountpay, setAmmountPay] = useState();
  const [returnammount, setReturnAmmount] = useState();
  const [finalpay, setFinalPay] = useState();
  const [balanceammount, setBalanceAmmount] = useState(0);


  //***********/This is a handle change function which help us to take the value from/*********//
  const handleChange = async (e) => {
    if (e.target.name === "cus_name") {
      setCusName(e.target.value);
    } else if (e.target.name === "p_Id") {
      setProductId(e.target.value);
    } else if (e.target.name === "p_name") {
      setProductName(e.target.value);
    } else if (e.target.name === "pro_quantity") {
      setProductQuantity(e.target.value);
    } else if (e.target.name === "ammountPay") {
      setAmmountPay(e.target.value);
    } else if (e.target.name === "returnAmmount") {
      setReturnAmmount(e.target.value)
    }
    // setInvoice({ ...invoice,[e.target.value]:e.target.name })
  };

  // const [products, setProducts] = useState(
  //   JSON.parse(localStorage.getItem("products")) || []
  // );
  // Here we fetch the function
  const fetchfunction = async () => {
    let id = p_Id;
    let a = await fetch(`http://localhost:5000/api/product/getproduct/${id}`);
    let res = await a.json();
    setProduct(res);
    console.log("This is a response", res);
  };

  useEffect(() => {
    fetchfunction();
    console.log("p", product);
    console.log("ps", products);
  }, [p_Id]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Here we set the product and all user input data into localstorage
  const addProductToLocalStorage = (
    P_sale,
    p_company,
    p_name,
    p_exsale,
    p_price,
    p_quantity,
    cus_name,
    p_Id,
    pro_quantity
  ) => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const newProduct = {
      P_sale,
      p_company,
      p_name,
      p_exsale,
      p_price,
      p_quantity,
      cus_name,
      p_Id,
      pro_quantity,
    };
    localStorage.setItem(
      "products",
      JSON.stringify([...existingProducts, newProduct])
    );
  };

  const total = () => {
    let t = JSON.parse(localStorage.getItem("products"));
    if (t) {
      let result = 0;
      let l = t.length;
      if (l !== 0) {
        for (let i = 0; i < t.length; i++) {
          let obj = t[i];
          let pro_quantity = parseInt(obj.pro_quantity);
          let p_price = parseInt(obj.p_price);
          result += pro_quantity * p_price;
        }
        console.log("Iam  a t", t);
        console.log(result);
        setSubtotal(result);
      } else {
        console.error("Length is Empty");
      }
    } else {
      console.error("No items in local storage");
    }
  };
  const totalQuantity = () => {
    let t = JSON.parse(localStorage.getItem("products"));
    if (t) {
      let result = 0;
      let l = t.length;
      if (l !== 0) {
        for (let i = 0; i < t.length; i++) {
          let obj = t[i];
          let pro_quantity = parseInt(obj.pro_quantity);
          result += pro_quantity;
        }
        console.log("Iam  a t", t);
        console.log(result);
        setTotalQuant(result);
      } else {
        console.error("Length is Empty");
      }
    } else {
      console.error("No items in local storage");
    }
  };

  const totalDiscount = () => {
    let t = JSON.parse(localStorage.getItem("products"));
    if (t) {
      let result = 0;
      let l = t.length;
      if (l !== 0) {
        for (let i = 0; i < t.length; i++) {
          let obj = t[i];
          let P_sale = parseInt(obj.P_sale);
          result += P_sale;
        }
        console.log("Iam  a t", t);
        console.log(result);
        setTotalSale(result);
      } else {
        console.error("Length is Empty");
      }
    } else {
      console.error("No items in local storage");
    }
  };

  const totalExDiscount = () => {
    let t = JSON.parse(localStorage.getItem("products"));
    if (t) {
      let result = 0;
      let l = t.length;
      if (l) {
        for (let i = 0; i < t.length; i++) {
          let obj = t[i];
          let p_exsale = parseInt(obj.p_exsale);
          result += p_exsale;
        }
        console.log("Iam  a t", t);
        console.log(result);
        setTotalExSale(result);
      } else {
        console.error("Length is Empty");
      }
    } else {
      console.error("No items in local storage");
    }
  };

  useEffect(() => {
    total();
    totalQuantity();
    totalDiscount();
    totalExDiscount();
    calculation()
  }, [finalpay]);


  //  This is a section where we are doing all calculation about product 
   const calculation = () =>{
    
     let per1 = (totalsale/100)*subtotal
     let per2 = (totalexsale/100)*subtotal
     let total = per1+per2;
     let finalTotal = subtotal - total
     var d = parseFloat(finalTotal).toFixed(3)
    setFinalPay(d)
    let balAmmount = finalpay - ammountpay
    setBalanceAmmount(balAmmount) 
   }
    

  return (
    <div className="container">
      <h2 className="text-4xl mt-2 mb-4">Create a Invoice</h2>
      <div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="product name" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control border-2 border-slate-200 rounded mt-2"
            id="productname"
            value={cus_name}
            name="cus_name"
            onChange={handleChange}
          />
        </div>
      </div>
      <form>
        <div className="flex">
          <div className="flex w-1/2">
            <div className="mb-3 flex flex-col w-1/3 m-auto">
              <label htmlFor="product name" className="form-label">
                Product ID
              </label>
              <input
                type="number"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productname"
                value={p_Id}
                name="p_Id"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 flex flex-col w-3/5 m-auto">
              <label htmlFor="productcategory" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productcategory"
                value={p_name}
                name="p_name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex w-1/2">
            <div className="mb-3 flex flex-col w-3/5 m-auto">
              <label htmlFor="product name" className="form-label">
                Product Qunatity
              </label>
              <input
                type="number"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productname"
                value={pro_quantity}
                name="pro_quantity"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 flex flex-col w-1/3 m-auto">
              <button
                type="submit"
                className="btn addcolor px-2 py-1 text-white rounded mt-2"
                onClick={() =>
                  addProductToLocalStorage(
                    product.P_sale,
                    product.p_company,
                    product.p_name,
                    product.p_exsale,
                    product.p_price,
                    product.p_quantity,
                    cus_name,
                    p_Id,
                    pro_quantity
                  )
                }
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="flex border-2 overflow-x-scroll mt-4">
        <div className="table w-full p-2">
          <table className="w-full border">
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
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  Actions
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
                <td className="p-2 border-r">
                  <input type="text" className="border p-1" />
                </td>
              </tr>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="bg-gray-100 text-center border-b text-sm text-gray-600"
                >
                  <td className="p-2 border-r">{product.p_Id}</td>
                  <td className="p-2 border-r">{product.p_name}</td>
                  <td className="p-2 border-r">{product.p_company}</td>
                  <td className="p-2 border-r">{product.p_price}</td>
                  <td className="p-2 border-r">{product.pro_quantity}</td>
                  <td className="p-2 border-r">{product.P_sale}</td>
                  <td className="p-2 border-r">{product.p_exsale}</td>
                  <td>
                    <a
                      href="#"
                      className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {/* ********* This is a third section of website where we are going to to all deal with total ammount ******** */}
        <div className="flex flex-row">
          <div className="w-1/2 my-6 p-2 flex flex-wrap bg-gray-50">
            <div className="p-2 text-base font-semibold mx-2">
              <label>Total Ammount: </label>
              <span className="text-blue-900">{subtotal}</span>
            </div>
            <div className="p-2 text-base font-semibold mx-2">
              <label>Total Quantity: </label>
              <span className="text-blue-900">{totalquant}</span>
            </div>
            <div className="p-2 text-base font-semibold mx-2">
              <label>Total Discount%: </label>
              <span className="text-blue-900">{parseFloat(totalsale).toFixed(2)}</span>
            </div>
            <div className="p-2 text-base font-semibold mx-2">
              <label>Total Extra Discount%: </label>
              <span className="text-blue-900">{parseFloat(totalexsale).toFixed(2)}</span>
            </div>
            <div className="p-2 text-base font-semibold mx-2">
              <label>Total Ammount after Discount: </label>
              <span className="text-blue-900">{finalpay}</span>
            </div>
          </div>

          {/* This is payment sectiom div */}
          <div className="w-1/2 my-2 p-2 flex flex-col bg-gray-50">
            <div className="p-2 text-base font-semibold mx-2">
              <label>Ammount Pay: </label>
              <input
                type="number"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productname"
                value={ammountpay}
                name="ammountPay"
                onChange={handleChange}
              />
            </div>
            <div className="p-2 text-base font-semibold mx-2">
            <label>Balance Ammount: </label>
              <input
                type="number"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productname" readOnly placeholder={Math.ceil(balanceammount)}
              />
            </div>
            <div className="p-2 text-base font-semibold mx-2">
            <label>Return Ammount: </label>
              <input
                type="number"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productname"
                value={returnammount}
                name="returnAmmount"
                onChange={handleChange}
              />
            </div>
            <div className="mx-4">
            <button
                type="submit"
                className="btn addcolor px-2 py-1 w-1/2 text-white rounded mt-2">
                Pay Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateInvoice;


//********************************************************************************************** */
//*********************************** Extra part of Code *************************************** */
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
