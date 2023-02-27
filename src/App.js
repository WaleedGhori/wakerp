  import './App.css';
  import {BrowserRouter as Router , Routes , Route, json} from 'react-router-dom';
  import Dashboard from './Pages/Dashboard';
  import Sidebar from './Components/Sidebar';
  import AddProduct from './Pages/AddProduct';
  import UpdateProduct from './Pages/UpdateProduct';
  import CreateInvoice from './Pages/CreateInvoice';
  import ProductState from './context/product/ProductState';
  import { useState, useEffect} from 'react';
  import ViewProduct from './Pages/ViewProduct';
  import DeleteProduct from './Pages/DeleteProduct';
  

  function App() {
    const [cart, setCart] = useState({});
    const [subtotal1, setsubtotal1] = useState();
    const [totalQuantity1, setTotalQuantity1] = useState();
    const [totalDiscount1, setTotalDiscount1] = useState();
    const [totalExDiscount1, setTotalExDiscount1] = useState();

    useEffect(() => {
      try {
        if (localStorage.getItem("cart")) {
          setCart(JSON.parse(localStorage.getItem("cart")))
          saveCart(JSON.parse(localStorage.getItem("cart")))
        }
      } catch (error) {
        console.error(error)
        localStorage.clear()
      }
    }, [])

    
    // add cart function
    const addToCart = (P_sale,p_company,p_name,p_exsale,p_price,p_quantity,cus_name,p_Id,pro_quantity) => {

      localStorage.setItem("cusname",cus_name )
      let newCart = cart;
      if (p_Id in cart) {
        newCart[p_Id].pro_quantity = cart[p_Id].pro_quantity + pro_quantity;
      }
      else {
        newCart[p_Id] = {      
          P_sale,
          p_company,
          p_name,
          p_exsale,
          p_price,
          p_quantity,
          cus_name,
          p_Id,
          pro_quantity 
        }
      }
      setCart(newCart)
      saveCart(newCart)
    }  
  

    // this is a save cart
    const saveCart = (myCart) => {
      localStorage.setItem('cart', JSON.stringify(myCart))
      let keys = Object.keys(myCart)
      let subt = 0
      for (let i = 0; i < keys.length; i++) {
        subt += myCart[keys[i]].p_price * myCart[keys[i]].pro_quantity
      }

      let subq = 0
      for (let i = 0; i < keys.length; i++) {
        let pro_quantity = parseInt(myCart[keys[i]].pro_quantity)
        subq += pro_quantity
      }

      let subdiscount = 0
      for (let i = 0; i < keys.length; i++) {
        subdiscount += myCart[keys[i]].P_sale 
      }

      let subexdiscount = 0
      for (let i = 0; i < keys.length; i++) {
        subexdiscount += myCart[keys[i]].p_exsale 
      }
      setsubtotal1(subt)
      setTotalQuantity1(subq)
      setTotalDiscount1(subdiscount)
      setTotalExDiscount1(subexdiscount)
      // console.log(cart);
    }

    
    const removeToCart = (p_Id) => {
      let newCart = JSON.parse(JSON.stringify(cart));
      // i am here loging console for error detection
      // let del  = Object.keys(cart[31])
      // console.log(del);
      delete newCart[p_Id]
      setCart(newCart)
      saveCart(newCart)
    }


    return (
      <>
      <ProductState>
        <Router>
          <Sidebar>
          <Routes>
            <Route exact path='/' element={<Dashboard/>}/>
            <Route exact path='/product/addproduct' element={<AddProduct/>}/>
            <Route exact path='/product/updateproduct' element={<UpdateProduct/>}/>
            <Route exact path='/product/getproduct' element={<ViewProduct/>}/>
            <Route exact path='/product/deleteproduct' element={<DeleteProduct/>}/>
            <Route exact path='/createinvoice' element={<CreateInvoice saveCart={saveCart} addToCart={addToCart} cart={cart} subtotal1={subtotal1} totalQuantity1={totalQuantity1} totalDiscount1={totalDiscount1} totalExDiscount1={totalExDiscount1} removeToCart={removeToCart}/>}/>
          </Routes>
          </Sidebar>
        </Router>
        </ProductState>
      </>
    );
  }

  export default App;