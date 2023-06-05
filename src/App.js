import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Components/Sidebar";
import AddProduct from "./Pages/AddProduct";
import UpdateProduct from "./Pages/UpdateProduct";
import CreateInvoice from "./Pages/CreateInvoice";
import ProductState from "./context/product/ProductState";
import { useState, useEffect } from "react";
import ViewProduct from "./Pages/ViewProduct";
import DeleteProduct from "./Pages/DeleteProduct";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
import Login from "./Pages/Login";
import CreateUser from "./Pages/CreateUser";

function App({login}) {
  const [cart, setCart] = useState({});
  const [subtotal1, setsubtotal1] = useState();
  const [totalQuantity1, setTotalQuantity1] = useState();
  const [totalDiscount1, setTotalDiscount1] = useState();
  const [totalExDiscount1, setTotalExDiscount1] = useState();
  const [showModal, setShowModal] = useState(false);
  const [prodQty, setProdQty] = useState("")

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, [ ]);

  // add cart function
  const addToCart = (
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
    localStorage.setItem("cusname", cus_name);
    let newCart = cart;
    if (p_Id in cart) {
      newCart[p_Id].pro_quantity = cart[p_Id].pro_quantity + pro_quantity;
    } else {
      newCart[p_Id] = {
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
    }
    setCart(newCart);
    saveCart(newCart);
  };

  // this is a save cart
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let keys = Object.keys(myCart);
    let subt = 0;
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].p_price * myCart[keys[i]].pro_quantity;
    }

    let subq = 0;
    for (let i = 0; i < keys.length; i++) {
      let pro_quantity = parseInt(myCart[keys[i]].pro_quantity);
      subq += pro_quantity;
    }

    let subdiscount = 0;
    for (let i = 0; i < keys.length; i++) {
      subdiscount += myCart[keys[i]].P_sale;
    }

    let subexdiscount = 0;
    for (let i = 0; i < keys.length; i++) {
      subexdiscount += myCart[keys[i]].p_exsale;
    }
    setsubtotal1(subt);
    setTotalQuantity1(subq);
    setTotalDiscount1(subdiscount);
    setTotalExDiscount1(subexdiscount);
    // console.log(cart);
  };

  const removeToCart = (p_Id) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    // i am here loging console for error detection
    // let del  = Object.keys(cart[31])
    // console.log(del);
    delete newCart[p_Id];
    setCart(newCart);
    saveCart(newCart);
  };

  const editCart = (p_Id) => {
    setShowModal(true);
    let newCart = JSON.parse(JSON.stringify(cart));
    setProdQty(newCart[p_Id].pro_quantity)
    newCart[p_Id].pro_quantity=prodQty
    setCart(newCart);
    saveCart(newCart);
  };

  const handleModelEdit = (e) => {
    e.preventDefault();
    editCart();
  }

  // const [loggedIn, setLoggedIn] = useState(false)
  // const loginHandler = () =>{
  //   const auth = localStorage.getItem("authtoken");
  //   if (auth) {
  //     setLoggedIn(true)
  //     console.log(loggedIn); 
  //     console.log(auth); 
  //   }
  // }
  
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Product</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="mb-3 flex flex-col">
                      <label for="productqunatity" className="form-label">
                        Product Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control border-2 border-slate-200 rounded mt-2"
                        id="productquantity"
                        value={prodQty}
                        name="prodQty"
                        onChange={(e) => setProdQty(e.target.value)}
                      />
                    </div>
                    <button
                      className="bg-[#101118] w-full text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={handleModelEdit}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex m-auto items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent first-letter:font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <ProductState>
        <Router>
          {!localStorage.getItem("authtoken")?
           ( <Routes>
              <Route exact path="/" element={<Login/>}/>   
              {/* <Route exact path="/" element={<Login login={loginHandler} loggedIn={loggedIn}/>}/>    */}
            </Routes>):(
                      <Sidebar>
                      <Routes>
                        <Route exact path="/" element={<Dashboard />} />
                        <Route
                          exact
                          path="/product/addproduct"
                          element={<AddProduct />}
                        />
                        <Route
                          exact
                          path="/product/updateproduct"
                          element={<UpdateProduct />}
                        />
                        <Route
                          exact
                          path="/product/getproduct"
                          element={<ViewProduct />}
                        />
                        <Route
                          exact
                          path="/product/deleteproduct"
                          element={<DeleteProduct />}
                        />
                        <Route
                          exact
                          path="/createuser"
                          element={<CreateUser/>}
                        />
                        <Route
                          exact
                          path="/createinvoice"
                          element={
                            <CreateInvoice
                              saveCart={saveCart}
                              addToCart={addToCart}
                              cart={cart}
                              subtotal1={subtotal1}
                              totalQuantity1={totalQuantity1}
                              totalDiscount1={totalDiscount1}
                              totalExDiscount1={totalExDiscount1}
                              removeToCart={removeToCart}
                              editCart={editCart}
                            />
                          }
                        />
                      </Routes>
                   </Sidebar>
            )
          }

            
        </Router>
      </ProductState>
    </>
  );
}

export default App;
