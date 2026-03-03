import React, { useContext, useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { updateUserProfileAPI } from '../../service/allAPIs';
import { serverURL } from '../../service/ServerURL';
import { userUpdateContext } from '../../ContextAPI/ContextShare';

function EditProfile() {
  const [offcanvas, setOffcanvas] = useState(false)
  const [userDetails, setUserDetails] = useState({ username: "", password: "", confirmPassword: "", bio: "", profileImage: "" })
  console.log(userDetails);

  const [preview, setPreview] = useState("")
  const [existingProfile, setExistingProfile] = useState("")

  const { setUserEditResponse } = useContext(userUpdateContext)

  const handleImageUpload = (e) => {
    console.log(e);
    setUserDetails({ ...userDetails, profileImage: e.target.files[0] })

    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({ username: user?.username, password: user?.password, confirmPassword: user?.password, bio: user?.bio })
      setExistingProfile(user?.profileImg)
    }
  }, [])

  const handleReset = () => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    setUserDetails({ username: user?.username, password: user?.password, confirmPassword: user?.password, bio: user?.bio })
    setExistingProfile(user?.profileImg)
    setPreview("")
  }

  const handleProfileUpdate = async () => {
    const { username, password, confirmPassword, bio, profileImage } = userDetails
    console.log(username, password, confirmPassword, bio, profileImage);

    if (!username || !password || !confirmPassword || !bio) {
      toast.info(`Enter The Details Completely!!!`)
    } else {
      if (password != confirmPassword) {
        toast.warning(`Password & Confirm Password Must Be Same!!!`)
      } else {
        const token = sessionStorage.getItem("token")
        // reqHeader
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        if (preview) {
          const reqBody = new FormData()
          for (let key in userDetails) {
            reqBody.append(key, userDetails[key])
          }
          const result = await updateUserProfileAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success(`Profile Updated Successfully`)
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setUserEditResponse(result.data)
            setOffcanvas(false)
          } else {
            toast.error(`Something Went Wrong!!!`)
          }
        } else {
          const result = await updateUserProfileAPI({ username, password, bio, profileImage: existingProfile }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success(`Profile Updated Successfully`)
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setUserEditResponse(result.data)
            setOffcanvas(false)
          } else {
            toast.error(`Something Went Wrong!!!`)
          }
        }
      }
    }
  }

  return (
    <>
      <button onClick={() => setOffcanvas(true)} className='flex px-4 py-2 font-bold border border-blue-200 text-blue-600 rounded'>
        <FaRegEdit className='mt-1 me-2' /> Edit
      </button>
      <div>
        {
          offcanvas &&

          <>
            <div className='fixed inset-0 bg-gray-500/75 w-full h-full'></div>
            <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
              <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
                <h1>Edit User Profile</h1>
                <button onClick={() => setOffcanvas(false)} >X</button>
              </div>
              <div className='flex justify-center items-center flex-col my-5'>
                <label htmlFor="profilePic">
                  <input onChange={(e) => handleImageUpload(e)} type="file" style={{ display: "none" }} id='profilePic' />
                  {
                    existingProfile == "" ?
                      <img src={preview ? preview : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} style={{ height: "150px", width: "150px", borderRadius: "50%" }} alt="" />
                      :
                      <img src={preview ? preview : `${serverURL}/uploadImages/${existingProfile}`} style={{ height: "150px", width: "150px", borderRadius: "50%" }} alt="" />
                  }
                </label>
              </div>
              <div className='mt-10 mb-3 w-full px-5'>
                <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
              </div>
              <div className='mt-5 mb-3 w-full px-5'>
                <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder='Password' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
              </div>
              <div className='mt-5 mb-3 w-full px-5'>
                <input value={userDetails.confirmPassword} onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })} type="text" placeholder='Confirm Password' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
              </div>
              <div className='mt-5 mb-3 w-full px-5'>
                <textarea value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} type="text" placeholder='Bio' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
              </div>
              <div className='flex justify-end w-full px-5'>
                <button onClick={handleReset} type='button' className='bg-amber-600 text-white rounded border py-3 px-4 hover:text-amber-600 hover:border:amber-600 hover:bg-white'>Reset</button>
                <button onClick={handleProfileUpdate} type='button' className='bg-green-600 text-white rounded border py-3 px-4 hover:text-green-600 hover:border:green-600 hover:bg-white ms-3'>Update</button>
              </div>
            </div>
          </>
        }


      </div>

    </>
  )
}

export default EditProfile