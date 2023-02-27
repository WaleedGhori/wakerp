import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductContext from "../context/product/ProductContext";

const CreateInvoice = ({ addToCart, cart, subtotal1, totalQuantity1, totalDiscount1, totalExDiscount1, removeToCart }) => {

  // This is a context of create Invoice
  // const context = useContext(ProductContext)
  // const {createCustomerInvocie} = context;
  const [createInvoice, setCreateInvoice] = useState({});


  //**** This section is our starting section of code ***//
  const [cus_name, setCusName] = useState(localStorage.getItem("cusname"));
  const [p_Id, setProductId] = useState();
  const [p_name, setProductName] = useState("");
  const [pro_quantity, setProductQuantity] = useState();
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [ammountpay, setAmmountPay] = useState();
  const [returnammount, setReturnAmmount] = useState();
  const [finalpay, setFinalPay] = useState();
  const [balanceammount, setBalanceAmmount] = useState(0);

  // const [invoice, setInvoice] = useState({cus_name:localStorage.getItem("cusname"),p_Id:"",products:"", pro_quantity:"",finalpay:"",ammountpay:0,balanceammount:"", totalsale:"",totalexsale:"", returnammount:0});
  let { userId } = useParams();
  const handleInvocie = async () => {
    // createCustomerInvocie({cus_name:cus_name, products:products,subtotal:subtotal, totalquant:totalquant ,finalpay:finalpay,ammountpay:ammountpay, balanceammount:balanceammount,totalsale:totalsale, totalexsale:totalexsale, returnammount:returnammount,  })
    let subtotal = subtotal1;
    let totalquant = totalQuantity1;
    let totalexsale = totalExDiscount1;
    let totalsale = totalDiscount1

    const data = { cus_name, cart, subtotal, totalquant, totalsale, totalexsale, ammountpay, returnammount, finalpay, balanceammount }
    const response = await fetch(
      `http://localhost:5000/api/customer/createinvocie`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYzNzI5NDVmOWE5ZDdmZjRlNzFkYzAwZCJ9LCJpYXQiOjE2Njg1Mzg3MzV9.dInE217SveqFq0457SHJnBzhhwvJLouM-Uxtex3ChPk",
        },
        body: JSON.stringify(data),
      }
    );
    const cusInv = await response.json();
    setCreateInvoice(cusInv);
    alert("Invoice Created successfully")
    localStorage.clear();
    window.location.reload(true);
  }


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
    // setInvoice({...invoice,[e.target.name]:e.target.value })
  };

  // const [products, setProducts] = useState(
  //   JSON.parse(localStorage.getItem("products")) || []
  // )

  // Here we fetch the function
  const fetchfunction = async () => {
    let id = p_Id;
    let a = await fetch(`http://localhost:5000/api/product/getproduct/${id}`);
    let res = await a.json();
    setProduct(res);
  };

  useEffect(() => {
    fetchfunction();
  }, [p_Id]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("cart"));
    setProducts(storedProducts);
    console.log("thnnmb", products);
  }, []);


  // Here we set the product and all user input data into localstorage
  // const addProductToLocalStorage = (
  //   P_sale,
  //   p_company,
  //   p_name,
  //   p_exsale,
  //   p_price,
  //   p_quantity,
  //   cus_name,
  //   p_Id,
  //   pro_quantity
  // ) => {
  //  const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
  //   const newProduct = {
  //     P_sale,
  //     p_company,
  //     p_name,
  //     p_exsale,
  //     p_price,
  //     p_quantity,
  //     cus_name,
  //     p_Id,
  //     pro_quantity,
  //   };
  //   localStorage.setItem(
  //     "products",
  //     JSON.stringify([...existingProducts, newProduct])
  //   );
  //   setCusName(localStorage.setItem("cusname", cus_name))
  // };

  useEffect(() => {
    // total();
    // totalQuantity();
    // totalDiscount();
    // totalExDiscount();
    calculation();
  }, [finalpay, ammountpay]);


  //  This is a section where we are doing all calculation about product 
  const calculation = () => {

    let per1 = (totalDiscount1 / 100) * subtotal1
    let per2 = (totalExDiscount1 / 100) * subtotal1
    let total = per1 + per2;
    let finalTotal = subtotal1 - total
    var d = parseFloat(finalTotal).toFixed(3)
    setFinalPay(d)
    console.log("This is a balance ammount d", d)
    let balAmmount = finalpay - ammountpay
    console.log("This is a balance ammount", balAmmount);
    if (ammountpay) {
      setBalanceAmmount(balAmmount)
    } else {
      setBalanceAmmount(0);
    }
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
              {/* <button
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
              </button> */}
              <button
                type="submit"
                className="btn addcolor px-2 py-1 text-white rounded mt-2"
                onClick={() =>
                  addToCart(
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
              {Object.keys(cart).map((product, index) => (
                <tr
                  key={index}
                  className="bg-gray-100 text-center border-b text-sm text-gray-600"
                >
                  <td className="p-2 border-r">{cart[product].p_Id}</td>
                  <td className="p-2 border-r">{cart[product].p_name}</td>
                  <td className="p-2 border-r">{cart[product].p_company}</td>
                  <td className="p-2 border-r">{cart[product].p_price}</td>
                  <td className="p-2 border-r">{cart[product].pro_quantity}</td>
                  <td className="p-2 border-r">{cart[product].P_sale}</td>
                  <td className="p-2 border-r">{cart[product].p_exsale}</td>
                  <td>
                    <a
                      href="#"
                      className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                    >
                      Edit
                    </a>
                        <button className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin" onClick={() => removeToCart(cart[product].p_Id)}>Remove</button>
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
              <span className="text-blue-900">{subtotal1}</span>
            </div>
            <div className="p-2 text-base font-semibold mx-2">
              <label>Total Quantity: </label>
              <span className="text-blue-900">{totalQuantity1}</span>
            </div>
            <div className="p-2 text-base font-semibold mx-2">
              <label>Total Discount%: </label>
              <span className="text-blue-900">{parseFloat(totalDiscount1).toFixed(2)}</span>
            </div>
            <div className="p-2 text-base font-semibold mx-2">
              <label>Total Extra Discount%: </label>
              <span className="text-blue-900">{parseFloat(totalExDiscount1).toFixed(2)}</span>
            </div>
            <div className="p-2 text-base font-semibold mx-2">
              <label>Total Ammount after Discount: </label>
              <span className="text-blue-900">{Math.ceil(finalpay)}</span>
            </div>
          </div>

          {/* This is payment sectiom div */}
          <div className="w-1/2 my-2 p-2 flex bg-gray-50">
            <div className="w-1/3">
              <div className="p-2 text-base font-semibold mx-2">
                <label>Ammount Pay: </label>
              </div>
              <div className="p-2 text-base font-semibold mx-2">
                <label>{finalpay <= ammountpay ? "Balance Ammount: " : "Credit Ammount: "} </label>

              </div>
              <div className="p-2 text-base font-semibold mx-2">
                <label>Return Ammount: </label>
              </div>
            </div>
            <div className="w-1/2">
              <input
                type="number"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productname"
                value={ammountpay}
                name="ammountPay"
                onChange={handleChange}
              />
              <input
                type="number"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productname" readOnly placeholder={Math.ceil(balanceammount)}
              />
              <input
                type="number"
                className="form-control border-2 border-slate-200 rounded mt-2"
                id="productname"
                value={returnammount}
                name="returnAmmount"
                onChange={handleChange}
              />
              <div>
                <button
                  type="submit"
                  onClick={handleInvocie}
                  className="btn addcolor px-2 py-1 w-2/3 text-white rounded mt-2">
                  Pay Now!
                </button>
              </div>
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




  // const total = () => {
  //   let t = JSON.parse(localStorage.getItem("cart"));
  //   if (t) {
  //     let result = 0;
  //     let l = t.length;
  //     if (l !== 0) {
  //       for (let i = 0; i < t.length; i++) {
  //         let obj = t[i];
  //         let pro_quantity = parseInt(obj.pro_quantity);
  //         let p_price = parseInt(obj.p_price);
  //         result += pro_quantity * p_price;
  //       }
  //       setSubtotal(result);
  //     } else {
  //       console.error("Length is Empty");
  //     }
  //   } else {
  //     console.error("No items in local storage");
  //   }
  // };
  // const totalQuantity = () => {
  //   let t = JSON.parse(localStorage.getItem("cart"));
  //   if (t) {
  //     let result = 0;
  //     let l = t.length;
  //     if (l !== 0) {
  //       for (let i = 0; i < t.length; i++) {
  //         let obj = t[i];
  //         let pro_quantity = parseInt(obj.pro_quantity);
  //         result += pro_quantity;
  //       }
  //       setTotalQuant(result);
  //     } else {
  //       console.error("Length is Empty");
  //     }
  //   } else {
  //     console.error("No items in local storage");
  //   }
  // };

  // const totalDiscount = () => {
  //   let t = JSON.parse(localStorage.getItem("cart"));
  //   if (t) {
  //     let result = 0;
  //     let l = t.length;
  //     if (l !== 0) {
  //       for (let i = 0; i < t.length; i++) {
  //         let obj = t[i];
  //         let P_sale = parseInt(obj.P_sale);
  //         result += P_sale;
  //       }
  //       setTotalSale(result);
  //     } else {
  //       console.error("Length is Empty");
  //     }
  //   } else {
  //     console.error("No items in local storage");
  //   }
  // };

  // const totalExDiscount = () => {
  //   let t = JSON.parse(localStorage.getItem("cart"));
  //   if (t) {
  //     let result = 0;
  //     let l = t.length;
  //     if (l) {
  //       for (let i = 0; i < t.length; i++) {
  //         let obj = t[i];
  //         let p_exsale = parseInt(obj.p_exsale);
  //         result += p_exsale;
  //       }
  //       setTotalExSale(result);
  //     } else {
  //       console.error("Length is Empty");
  //     }
  //   } else {
  //     console.error("No items in local storage");
  //   }
  // };
