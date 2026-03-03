import React, { useContext, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa6";
import { googleLoginAPI, loginAPI, registerAPI } from '../../service/allAPIs';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { userAuthContext } from '../../ContextAPI/AuthContext';


function Auth({ register }) {
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState({ username: "", email: "", password: "" })
  console.log(userData);

  const { setAuthorisedUser } = useContext(userAuthContext)


  const navigate = useNavigate()

  const handleReset = () => {
    setUserData({ username: "", email: "", password: "" })
  }

  const handleRegister = async () => {
    const { username, email, password } = userData // destructure
    if (!username || !email || !password) {
      toast.info("Enter the Details Completely")
    } else {
      try {
        const result = await registerAPI(userData)
        console.log(result);
        if (result.status == 200) {
          navigate("/login")
          handleReset()
          // alert("Register Successfull")
          toast.success(`Register Successfull!!!`)
        } else if (result.status == 401) {
          toast.warning(result.response.data)
          navigate("/login")
        } else {
          toast.error("Something Went Wrong")
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleLogin = async () => {
    const { email, password } = userData // destructure
    console.log(email, password);
    if (!email || !password) {
      toast.info(`Fill the Details Completely...`)
    } else {
      try {
        const result = await loginAPI(userData)
        console.log(result);
        if (result.status == 200) {
          setAuthorisedUser(true)
          if (result.data.existingUser.role == "Admin") {
            navigate("/admin-dashboard")
          } else {
            navigate("/")
          }
          handleReset()

          toast.success(`Login Successfull!!!`)
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token", result.data.token)
        } else if (result.status == 401) {
          toast.warning(result.response.data)
        } else {
          toast.error(`Something Went Wrong`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    console.log(credentialResponse.credential);

    const details = jwtDecode(credentialResponse?.credential)
    console.log(details);

    try {
      const result = await googleLoginAPI({ username: details?.name, email: details?.email, password: "GooglePassword", profileImg: details?.picture })
      console.log(result);
      if (result.status == 200) {
        setAuthorisedUser(true)
        toast.success(`Login Successfull!!!`)

        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        if (result.data.user.role == "Admin") {
          navigate("/admin-dashboard")
        } else {
          navigate("/")
        }
      } else {
        toast.error(`Something Went Wrong!!!`)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[url("https://plus.unsplash.com/premium_photo-1681487916420-8f50a06eb60e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW4lMjBwYWdlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000")]'>
        <div className='p-10'>
          <h1 className='text-3xl font-bold text-center'>Book Store</h1>
          <div style={{ width: "400px" }} className='bg-black text-white p-5 flex flex-col justify-center items-center my-5'>
            <div style={{ width: "100px", height: "100px", borderRadius: "50%" }} className='border mb-5 flex justify-center items-center'>
              <CgProfile className='text-8xl' />
            </div>
            {register ? <h1 className='text2-xl'>Register</h1> :
              <h1 className='text2-xl'>Login</h1>}
            <form className='my-5 w-full'>
              {register && <div>
                <label htmlFor="">Username</label>
                <input value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} type="text" placeholder='Enter Username' className='bg-white p-2 w-full rounded placeholder-gray-500 my-5 text-black' />
              </div>}
              <div>
                <label htmlFor="">Email</label>
                <input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="text" placeholder='Enter Email' className='bg-white p-2 w-full rounded placeholder-gray-500 my-5 text-black' />

              </div>
              <div className=''>
                <label htmlFor="">Password</label>
                <input value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} type={showPassword ? "text" : "password"} placeholder='Enter Password' className='bg-white p-2 w-full rounded placeholder-gray-500 my-5 text-black' />

                {showPassword ?
                  <LuEye onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: "330px", marginTop: "-53px" }} className='text-gray-500 cursor-pointer text-2xl' /> :
                  <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: "330px", marginTop: "-53px" }} className='text-gray-500 cursor-pointer text-2xl' />}

                <div className='mt-5'>
                  <p className='text-xs text-orange-300 '>*Never share your password with orthers</p>
                </div>
                <div className='text-center mt-4' >
                  {register ?
                    <button onClick={handleRegister} type='button' className='bg-green-700 p-2 w-full rounded'>Register</button> :
                    <button onClick={handleLogin} type='button' className='bg-green-700 p-2 w-full rounded'>Login</button>}
                </div>
                <div>
                  {/* Google Authentication */}
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>
                <div className='my-5 text-center'>
                  {register ? <p>Are you already a user? <Link to={"/login"} className='text-orange-300'>Login</Link></p> :
                    <p>Are you a New User ? <Link to={"/register"} className='text-orange-300'>Register</Link></p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Auth