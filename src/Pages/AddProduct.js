
import React,{useContext ,useState} from 'react'
import ProductContext from '../context/product/ProductContext'

const AddProduct = () => {

  const context = useContext(ProductContext)
  const {addProduct} = context;

const [product, setproduct] = useState({p_name:"",p_category:"",p_company:"",p_quantity:"",p_price:"",P_sale:"",p_exsale:""});

const handleClick = (e)=>{
  e.preventDefault();
  addProduct(product.p_name,product.p_category,product.p_company,product.p_quantity,product.p_price,product.P_sale,product.p_exsale);
  setproduct({p_name:"",p_category:"",p_company:"",p_quantity:"",p_price:"",P_sale:"",p_exsale:"" })
}
const onChange = (e)=>{
  setproduct({...product,[e.target.name]:e.target.value})
}
 
  return (
    <div className='container'>
      <h2 className='text-4xl mt-2 mb-4'>Add Product</h2>
    <form className=''>
      <div className="mb-3 flex flex-col">
       <label for="product name" className="form-label">Product Name</label>
        <input type="text" className="form-control border-2 border-slate-200 rounded mt-2" id="productname" value={product.p_name} name="p_name" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productcategory" className="form-label">Product Category</label>
        <input type="text" className="form-control border-2 border-slate-200 rounded mt-2" id="productcategory" value={product.p_category} name="p_category" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productcompany" className="form-label">Product Company</label>
        <input type="text" className="form-control border-2 border-slate-200 rounded mt-2" id="productcompany" value={product.p_company} name="p_company" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productqunatity" className="form-label">Product Quantity</label>
        <input type="Number" className="form-control border-2 border-slate-200 rounded mt-2" id="productquantity" value={product.p_quantity} name="p_quantity" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productprice" className="form-label">Product Price</label>
        <input type="Number" className="form-control border-2 border-slate-200 rounded mt-2" id="productprice" value={product.p_price} name="p_price" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productdiscount" className="form-label">Product Discount</label>
        <input type="Number" className="form-control border-2 border-slate-200 rounded mt-2" id="productdiscount" value={product.P_sale} name="P_sale" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productExtradiscount" className="form-label">Product Extra Discount</label>
        <input type="Number" className="form-control border-2 border-slate-200 rounded mt-2" id="productextradiscount" value={product.p_exsale} name="p_exsale" onChange={onChange} />
      </div>
      
      <button type="submit" className="btn addcolor p-2 text-white rounded mt-2"onClick={handleClick}>Add Product</button>
  </form>
  </div>
  )
}

export default AddProduct