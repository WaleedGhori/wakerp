// import React, { createContext,useEffect } from "react";

// export  const  ShopContext = createContext(null);
// export const ShopContextProvider = (props) =>{
//     const [product , setProduct] = useState()

//     //********Here we fetch the data from api************//
//     const fetchfunction = async()=>{
//         let a = await fetch(`http://localhost:5000/api/product/getproduct`)
//         let res = await a.json();
//         setProduct(res)
//         // console.log("This is a response",res);
//       }
    
//       useEffect(() => {
//         fetchfunction();   
//       }, [])
    
//     //***********Here we run the loop on getDefaultcart************//
//       const getDefaultCart = () => {
//         let cart = {};
//         for (let i = 1; i < product.length + 1; i++) {
//           cart[i] = 0;
//         }
//         return cart;
//     };
//     const [cartitem, setCartItem] = useState(getDefaultCart())

//     const addToCart = (itemId) => {
//         setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//       };

//     const  contextValue = {
//         cartitem,
//         addToCart
//     }

//     return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
// }