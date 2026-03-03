import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import { serverURL } from '../../service/ServerURL'
import { toast } from 'react-toastify'
import { updateAdminProfileAPI } from '../../service/allAPIs'
import { adminUpdateContext } from '../../ContextAPI/ContextShare'

function AdminSettings() {
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profileImage: ""
  })
  const [existingProfile, setExistingProfile] = useState("")
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  console.log(adminData, existingProfile);

  const {setAdminEditResponse} = useContext(adminUpdateContext)

  const handleUploadImage = (e) => {
    console.log(e);
    setAdminData({ ...adminData, profileImage: e.target.files[0] })
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  // update admin profile
  const handleUpdate = async () => {
    const { username, password, confirmPassword, profileImage } = adminData
    console.log(username, password, confirmPassword, profileImage);
    if (!username || !password || !confirmPassword) {
      toast.warning("Fill The Form Comepletly!!!")
    } else {
      if (password != confirmPassword) {
        toast.warning(`Password and Confirm Password must be same!!!`)
      } else {
        // reqHeader
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }

        const reqBody = new FormData()
        reqBody.append("username", username)
        reqBody.append("password", password)
        reqBody.append("profileImage", profileImage)

        if (preview) {
          const result = await updateAdminProfileAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            toast.success(`Profile Updated Successfully!!!`)
            setAdminEditResponse(result)
          } else {
            toast.error(`Something Went Wrong!!!`)
          }

        } else {
          const result = await updateAdminProfileAPI(adminData, reqHeader)
          console.log(result);
          if (result.status == 200) {
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            toast.success(`Profile Updated Successfully!!!`)
            setAdminEditResponse(result)
          } else {
            toast.error(`Something Went Wrong!!!`)
          }
        }
      }
    }

  }

  // reset data
  const handleReset = async ()=>{
    if (sessionStorage.getItem("token")) {
      const data = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminData({ username: data?.username, password: data?.password, confirmPassword: data?.password })
      setExistingProfile(data?.profileImg)
      setPreview("")
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      const data = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminData({ username: data?.username, password: data?.password, confirmPassword: data?.password })
      setExistingProfile(data?.profileImg)
    }
  }, [])
  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>

        <div className='col-span-4 p-10'>
          <h1 className='text-center text-3xl font-bold my-5'>Settings</h1>
          <div className='md:grid grid-cols-2 gap-5 mx-5 items-center'>
            <div className='mt-5'>
              <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vitae, praesentium maxime doloremque omnis accusamus itaque dicta culpa animi officia error labore, sed sint saepe quos id inventore fuga tempore!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vitae, praesentium maxime doloremque omnis accusamus itaque dicta culpa animi officia error labore, sed sint saepe quos id inventore fuga tempore!</p>
              <p className='text-justify mt-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vitae, praesentium maxime doloremque omnis accusamus itaque dicta culpa animi officia error labore, sed sint saepe quos id inventore fuga tempore!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vitae, praesentium maxime doloremque omnis accusamus itaque dicta culpa animi officia error labore, sed sint saepe quos id inventore fuga tempore!</p>
            </div>
            <div className='rounded bg-blue-100 p-10 flex justify-center items-center flex-col mt-10 md:mt-0'>
              <div>
                <label htmlFor="proimg" className='flex justify-center items-center'>
                  <input onChange={(e) => handleUploadImage(e)} id='proimg' type="file" className='hidden' />
                  {
                    existingProfile == "" ?
                      <img width={"200px"} height={"200px"} style={{ borderRadius: "50%" }} src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7VxDe4wzr6eLzRrpRXsqUl1pgSst3Q1XytA&s"} alt="" />
                      :
                      <img width={"200px"} height={"200px"} style={{ borderRadius: "50%" }} src={preview ? preview : `${serverURL}/uploadImages/${existingProfile}`} alt="" />
                  }

                </label>
                <div className='mb-3 w-full'>
                  <label htmlFor="">Username</label>
                  <input value={adminData?.username} onChange={(e) => setAdminData({ ...adminData, username: e.target.value })} type="text" placeholder='Enter Username' className='p-2 bg-white border border-gray-200 text-black w-full rounded placeholder-gray-600' />
                </div>
                <div className='mb-3 w-full'>
                  <label htmlFor="">Password</label>
                  <input value={adminData?.password} onChange={(e) => setAdminData({ ...adminData, password: e.target.value })} type="text" placeholder='Enter Password' className='p-2 bg-white border border-gray-200 text-black w-full rounded placeholder-gray-600' />
                </div>
                <div className='mb-3 w-full'>
                  <label htmlFor="">Confirm Password</label>
                  <input value={adminData?.confirmPassword} onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })} type="text" placeholder='Enter Confirm Password' className='p-2 bg-white border border-gray-200 text-black w-full rounded placeholder-gray-600' />
                </div>
                <div className='my-3 w-full flex justify-evenly'>
                  <button onClick={handleReset} type='button' className='bg-orange-600 text-white px-4 py-2 rounded'>Reset</button>
                  <button onClick={handleUpdate} type='button' className='bg-green-600 text-white px-4 py-2 rounded'>Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AdminSettings