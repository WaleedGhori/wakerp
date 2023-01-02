import { useState } from "react";
import ProductContext from "./ProductContext";

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
  const createCustomerInvocie = async (
    c_Id,
    cus_name,
    p_Id,
    p_name,
    pro_quantity,
    t_ammount,
    a_recived,
    bal_ammount,
    discount
  ) => {
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
          c_Id,
          cus_name,
          p_Id,
          p_name,
          pro_quantity,
          t_ammount,
          a_recived,
          bal_ammount,
          discount
        }),
      }
    );
    const cusInv = await response.json();
    setCreateInvoice(createInvoice.concat(cusInv));
  };

  return (
    // <ProductContext.Provider value={{state , update}}>
    <ProductContext.Provider value={{ addProduct ,createCustomerInvocie }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;