import { useState, useEffect } from "react";
import ProductContext from "./ProductContext";



//***********Here we run the loop on getDefaultcart************//


const ProductState = (props) => {
  const intialProps = [];
  const [prods, setProds] = useState(intialProps);
  const [createInvoice, setCreateInvoice] = useState(intialProps);

  const addProduct = async (
    p_name,
    p_category,
    p_company,
    p_quantity,
    p_price,
    P_sale,
    p_exsale
  ) => {
    // console.log("Iam a add",p_name);
    const response = await fetch(
      `http://localhost:5000/api/product/addproduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYzNzI5NDVmOWE5ZDdmZjRlNzFkYzAwZCJ9LCJpYXQiOjE2Njg1Mzg3MzV9.dInE217SveqFq0457SHJnBzhhwvJLouM-Uxtex3ChPk",
        },
        body: JSON.stringify({
          p_name,
          p_category,
          p_company,
          p_quantity,
          p_price,
          P_sale,
          p_exsale,
        }),
      }
    );
    const prod = await response.json();
    setProds(prods.concat(prod));
  
  };

  // this is our add customer state
  const createCustomerInvocie = async (cus_name, products,subtotal, totalquant ,finalpay,ammountpay,balanceammount,totalsale, totalexsale,returnammount) => {
    console.log(cus_name);
    const response = await fetch(
      `http://localhost:5000/api/customer/createinvocie`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYzNzI5NDVmOWE5ZDdmZjRlNzFkYzAwZCJ9LCJpYXQiOjE2Njg1Mzg3MzV9.dInE217SveqFq0457SHJnBzhhwvJLouM-Uxtex3ChPk",
        },
        body: JSON.stringify({
          cus_name, products,subtotal, totalquant ,finalpay,ammountpay,balanceammount,totalsale, totalexsale,returnammount
        }),
      }
    );
    const cusInv = await response.json();
    setCreateInvoice(createInvoice.concat(cusInv));
  };


//************* This our add to cart product section ***********//
// HERE WE FETCH THE DATA 
// const fetchfunction = async()=>{
//   let a = await fetch(`http://localhost:5000/api/product/getproduct`)
//   let res = await a.json();
//   const getDefaultCart = () => {
//     let cart = {};
//     for (let i = 1; i < res.length + 1; i++) {
//       cart[i] = 0;
//     }
//     return cart;
//   };
//   // console.log("This is a response",res);
// }

// useEffect(() => {
//   fetchfunction();   
// }, [])

// // const [product , setProduct] = useState()
// //********Here we fetch the data from api************//
   
//     const [cartitem, setCartItem] = useState(getDefaultCart())

//     const addToCart = (itemId) => {
//         setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//       };

    const  contextValue = {
        // cartitem,
        // addToCart,
        addProduct ,
        createCustomerInvocie
    }

//    console.log(cartitem);

  return (
    // <ProductContext.Provider value={{state , update}}>
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;