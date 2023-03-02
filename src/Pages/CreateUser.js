
import React, {useState } from 'react'

const CreateUser = () => {
    const [a_name, seta_name] = useState("")
    const [f_name, setf_name] = useState("")
    const [password, setPassword] = useState("")
    const [cnic, setCnic] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const onChange = (e) => {
        if (e.target.name === "a_name") {
            seta_name(e.target.value)
        }
        if (e.target.name === "f_name") {
            setf_name(e.target.value)
        }
        if (e.target.name === "password") {
            setPassword(e.target.value)
        }
        if (e.target.name === "cnic") {
            setCnic(e.target.value)
        }
        if (e.target.name === "phone") {
            setPhone(e.target.value)
        }
        if (e.target.name === "address") {
            setAddress(e.target.value)
        }
    }

    const handleClick = async(e)=>{
        e.preventDefault();
        const data = {a_name,f_name,password,cnic,phone,address}
        const res = await fetch(`http://localhost:5000/api/auth/createadmin`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data),
        })

        const response = await res.json()
        localStorage.setItem("auth-token",JSON.stringify(response))
        seta_name("")
        setf_name("")
        setPassword("")
        setAddress("")
        setPhone("")
        setCnic("")
        
        if (res.ok) {
            alert("User created Successfully")
        }
        else{
            alert("error occured...")
        }

    }
    return (
        <div className='container'>
            <h2 className='text-4xl mt-2 mb-4'>Create User</h2>
            <form className=''>
                <div className="mb-3 flex flex-col">
                    <label for="product name" className="form-label">User Name</label>
                    <input type="text" className="form-control border-2 border-slate-200 rounded mt-2" id="a_name" value={a_name} name="a_name" onChange={onChange} />
                </div>
                <div className="mb-3 flex flex-col">
                    <label for="productcategory" className="form-label">User Father Name</label>
                    <input type="text" className="form-control border-2 border-slate-200 rounded mt-2" id="f_name" value={f_name} name="f_name" onChange={onChange} />
                </div>
                <div className="mb-3 flex flex-col">
                    <label for="productcompany" className="form-label">Password</label>
                    <input type="password" className="form-control border-2 border-slate-200 rounded mt-2" id="password" value={password} name="password" onChange={onChange} />
                </div>
                <div className="mb-3 flex flex-col">
                    <label for="productqunatity" className="form-label">Cnic</label>
                    <input type="number" className="form-control border-2 border-slate-200 rounded mt-2" id="cnic" value={cnic} name="cnic" onChange={onChange} />
                </div>
                <div className="mb-3 flex flex-col">
                    <label for="productprice" className="form-label">Phone Number</label>
                    <input type="Number" className="form-control border-2 border-slate-200 rounded mt-2" id="phone" value={phone} name="phone" onChange={onChange} />
                </div>
                <div className="mb-3 flex flex-col">
                    <label for="productdiscount" className="form-label">Address</label>
                    <textarea  className="form-control border-2 border-slate-200 rounded mt-2" id="address" value={address} name="address" onChange={onChange} />
                </div>
               <button type="submit" className="btn addcolor p-2 text-white rounded mt-2" onClick={handleClick}>Add User</button>

            </form>
        </div>
    )
}

export default CreateUser