import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Sidebar from './Components/Sidebar';
import AddProduct from './Pages/AddProduct';
import CreateInvoice from './Pages/CreateInvoice';
import ProductState from './context/product/ProductState';



function App() {
  return (
    <>
    <ProductState>
      <Router>
        <Sidebar>
        <Routes>
          <Route exact path='/' element={<Dashboard/>}/>
          <Route exact path='/addproduct' element={<AddProduct/>}/>
          <Route exact path='/createinvoice' element={<CreateInvoice/>}/>
        </Routes>
        </Sidebar>
      </Router>
      </ProductState>
    </>
  );
}

export default App;