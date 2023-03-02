import React,{useState} from 'react'


const Login = (props) => {
  const [a_name, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // const [credentials, setCredentials] = useState({a_name:"",password:""})
  const handleChange = (e) =>{
    if (e.target.name == 'a_name') {
      setUsername(e.target.value)
    }
    if (e.target.name=='password') {
      setPassword(e.target.value)
    }
    // setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleClick = async (e) => {
    e.preventDefault();
    const data = {a_name , password}
    // console.log("This is a credentials",credentials);
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
      body: JSON.stringify(data)
    });
    const user = await response.json();
    console.log(user);
    
    if (response.ok) {
      props.login(a_name , password);
      // Store authentication token or session data in state
    } else {
      console.log("Login failed.");
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-[#101118] underline">
          Sign in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              User Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-[#101118] bg-white border rounded-md focus:border-[#101118] focus:ring-[#101118] focus:outline-none focus:ring focus:ring-opacity-40"
              name='a_name'
              value={a_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-[#101118] bg-white border rounded-md focus:border-[#101118] focus:ring-[#101118] focus:outline-none focus:ring focus:ring-opacity-40"
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6">
            <button  onClick={handleClick}  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#101118] rounded-md hover:bg-[#101118]e-600 focus:outline-none focus:bg-[#101118]">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login