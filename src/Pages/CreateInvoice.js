import React,{useContext, useState} from 'react'
import ProductContext from '../context/product/ProductContext'

const CreateInvoice = () => {
  const context = useContext(ProductContext)
  const {createCustomerInvocie} = context;


  const [invoice  , setInvoice] = useState({c_Id:"",cus_name:" ",p_Id:" ",p_name:" ",pro_quantity:" ",t_ammount:" ",a_recived:" ",bal_ammount:" ",discount:" "})
  
  const onChange = (e)=>{
    setInvoice({...invoice,[e.target.value]:e.target.name})
  }

  const handleClick= ()=>{

  }
  return (
      <div className='container'>
        <h2 className='text-4xl mt-2 mb-4'>Create a Invoice</h2>
      <form>
        <div className="mb-3">
         <label for="product name" className="form-label">Customer Name</label>
          <input type="text" className="form-control" id="productname" value={invoice.cus_name} name="p_name" onChange={onChange}/>
        </div>

      <div className='flex'>
        <div className='w-1/2 flex '>
        <div className="mb-3 w-1/3 mx-auto">
         <label for="product name" className="form-label">1</label>
          <input type="text" className="form-control" id="productname" value={invoice.p_Id} name="p_name" onChange={onChange}/>
        </div>
        <div className="mb-3 w-2/3 mx-auto">
         <label for="product name" className="form-label">2</label>
          <input type="text" className="form-control" id="productname" value={invoice.p_Id} name="p_name" onChange={onChange}/>
        </div>
        </div>
        <div className='w-1/2 flex'>
        <div className="mb-3 w-1/2 mx-auto">
         <label for="product name" className="form-label">Customer Name</label>
          <input type="text" className="form-control" id="productname" value={invoice.p_Id} name="p_name" onChange={onChange}/>
        </div>
        <div className="mb-3 w-1/2 mx-auto">
         <label for="product name" className="form-label">Customer Name</label>
          <input type="text" className="form-control btn bg" id="productname" value={invoice.p_Id} name="p_name" onChange={onChange}/>
        </div>
        </div>
      </div>




        <div className="mb-3">
         <label for="product name" className="form-label">Customer Name</label>
          <input type="text" className="form-control" id="productname" value={invoice.p_Id} name="p_name" onChange={onChange}/>
        </div>
        <div className="mb-3">
         <label for="product name" className="form-label">Customer Name</label>
          <input type="text" className="form-control" id="productname" value={invoice.p_name} name="p_name" onChange={onChange}/>
        </div>
        <div className="mb-3">
         <label for="product name" className="form-label">Customer Name</label>
          <input type="text" className="form-control" id="productname" value={invoice.pro_quantity} name="p_name" onChange={onChange}/>
        </div>
        <div className="mb-3">
         <label for="product name" className="form-label">Customer Name</label>
          <input type="text" className="form-control" id="productname" value={invoice.t_ammount} name="p_name" onChange={onChange}/>
        </div>

          <button type="submit" className="btn addcolor text-white"onClick={handleClick}>Add Product</button>
    </form>
    </div>
  )
}

export default CreateInvoice