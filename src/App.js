  import './App.css';
  import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
  import Dashboard from './Pages/Dashboard';
  import Sidebar from './components/Sidebar';
  import AddProduct from './Pages/AddProduct';
  import CreateInvoice from './Pages/CreateInvoice';
  import ProductState from './context/product/ProductState';
  import { useState, useEffect} from 'react';
  import { CartProvider } from "react-use-cart";

  function App() {
    const [cart, setCart] = useState({});
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
      try {
        if (localStorage.getItem("cart")) {
          setCart(JSON.parse(localStorage.getItem("cart")))
          saveCart(JSON.parse(localStorage.getItem("cart")))
      console.log("Iam a cart",cart);

        }
      } catch (error) {
        console.error(error)
        localStorage.clear()
      }
    }, [])

    // add cart
    const addToCart = (p_Id, P_sale,p_company,p_exsale,p_name,p_price ,cus_name,pro_quantity, p_quantity) => {
      let newCart = cart;
      if (p_Id in cart) {
        newCart[p_Id].pro_quantity = cart[p_Id].pro_quantity + pro_quantity;
      }
      else {
        newCart[p_Id] = { P_sale,p_company,p_exsale,p_name,p_price ,cus_name,pro_quantity:1 }
      }
      setCart(newCart)
      saveCart(newCart)
    }  
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


    return (
      <>
      <ProductState>
        <Router>
          <Sidebar>
          <Routes>
            <Route exact path='/' element={<Dashboard/>}/>
            <Route exact path='/product/addproduct' element={<AddProduct/>}/>
            <Route exact path='/createinvoice' element={<CreateInvoice saveCart={saveCart} addToCart={addToCart} cart={cart}/>}/>
          </Routes>
          </Sidebar>
        </Router>
        </ProductState>
      </>
    );
  }

  export default App;