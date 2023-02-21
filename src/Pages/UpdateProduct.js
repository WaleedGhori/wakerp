
import React,{useContext ,useState} from 'react'
import ProductContext from '../context/product/ProductContext'
const Updateproduct = () => {

  const context = useContext(ProductContext)
  const {updateProduct} = context;

const [product, setproduct] = useState({p_Id:"",p_name:"",p_category:"",p_company:"",p_quantity:"",p_price:"",P_sale:"",p_exsale:""});

const handleClick = (e)=>{
  e.preventDefault();
  updateProduct(product.p_Id,product.p_name,product.p_category,product.p_company,product.p_quantity,product.p_price,product.P_sale,product.p_exsale);
  setproduct({p_Id:"", p_name:"",p_category:"",p_company:"",p_quantity:"",p_price:"",P_sale:"",p_exsale:"" }) 
  alert("Product Updated Successfully")
}

const onChange = (e)=>{
  setproduct({...product,[e.target.name]:e.target.value})

}

const handleUpdate = async(e) =>{
    e.preventDefault()
    let id  = product.p_Id
    let a = await fetch(`http://localhost:5000/api/product/getproduct/${id}`);
    let res = await a.json();
    console.log(res);
    setproduct(res)
//    console.log("this is a update",updateproduct);
}
 
  return (
    <div className='container'>
      <h2 className='text-4xl mt-2 mb-4'>Update Product</h2>
    <div className=''>
        <label className='my-2 font-semibold t text-lg'>Enter a product Id for Update: </label>
        <input type='number' name='p_Id' value={product.p_Id} onChange={onChange} className='m-2 p-1 border-2 border-slate-200 rounded'/>
        <button onClick={handleUpdate} className='bg-slate-900 text-white m-2 p-1 px-4 rounded'>Find Product</button>
    </div>
    <hr className=''/>
    
    <form className='mt-6'>
      <div className="mb-3 flex flex-col">
       <label for="product name" className="form-label">Product Name</label>
        <input type="text" className="form-control border-2 border-slate-200 rounded mt-2 p-1" id="productname" value={product.p_name} name="p_name" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productcategory" className="form-label">Product Category</label>
        <input type="text" className="form-control border-2 border-slate-200 rounded mt-2 p-1" id="productcategory" value={product.p_category} name="p_category" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productcompany" className="form-label">Product Company</label>
        <input type="text" className="form-control border-2 border-slate-200 rounded mt-2 p-1" id="productcompany" value={product.p_company} name="p_company" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productqunatity" className="form-label">Product Quantity</label>
        <input type="Number" className="form-control border-2 border-slate-200 rounded mt-2 p-1" id="productquantity" value={product.p_quantity} name="p_quantity" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productprice" className="form-label">Product Price</label>
        <input type="Number" className="form-control border-2 border-slate-200 rounded mt-2 p-1" id="productprice" value={product.p_price} name="p_price" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productdiscount" className="form-label">Product Discount</label>
        <input type="Number" className="form-control border-2 border-slate-200 rounded mt-2 p-1" id="productdiscount" value={product.P_sale} name="P_sale" onChange={onChange}/>
      </div>
      <div className="mb-3 flex flex-col">
       <label for="productExtradiscount" className="form-label">Product Extra Discount</label>
        <input type="Number" className="form-control border-2 border-slate-200 rounded mt-2 p-1" id="productextradiscount" value={product.p_exsale} name="p_exsale" onChange={onChange} />
      </div>
      
      <button type="submit" className="btn addcolor p-2 text-white rounded mt-2"onClick={handleClick}>Update Product</button>
  </form>
  </div>
  )
}

export default Updateproduct