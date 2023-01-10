import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Sidebar from './Components/Sidebar';
import AddProduct from './Pages/AddProduct';
import CreateInvoice from './Pages/CreateInvoice';
import ProductState from './context/product/ProductState';
import { useState } from 'react';
import { CartProvider } from "react-use-cart";

function App() {
  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);


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
  return (
    <>
    <CartProvider>
    <ProductState>
      <Router>
        <Sidebar>
        <Routes>
          <Route exact path='/' element={<Dashboard/>}/>
          <Route exact path='/addproduct' element={<AddProduct/>}/>
          <Route exact path='/createinvoice' element={<CreateInvoice saveCart={saveCart} addToCart={addToCart} cart={cart}/>}/>
        </Routes>
        </Sidebar>
      </Router>
      </ProductState>
      </CartProvider>
    </>
  );
}

export default App;