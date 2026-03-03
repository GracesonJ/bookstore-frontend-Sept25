import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import { TbBooks } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { IoDocumentSharp } from "react-icons/io5";
import { getAllBooksAPI, getAllUsersAPI } from '../../service/allAPIs';

function AdminDashboard() {
  const [getAllbooks, setgetAllbooks] = useState(0)
  const [allUsers, setAllUsers] = useState(0)
  const [token, setToken] = useState("")

  const getData = async () => {
    // reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getAllBooksAPI(reqHeader)
      console.log(result);
      setgetAllbooks(result?.data?.length)
      const result2 = await getAllUsersAPI(reqHeader)
      console.log(result2);
      setAllUsers(result2?.data?.length)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    if (token) {
      getData()
    }


  }, [token])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>

        <div className='col-span-4 p-10'>
          <div className='md:grid grid-cols-3'>
            <div className='md:px-5 my-5 md:my-0'>
              <div className='bg-blue-900 p-4 flex items-center text-2xl rounded text-white'>
                <TbBooks />
                <div className='flex ms-2'>
                  <h3>Total No:of Books :</h3>
                  <span className='ms-3'>{getAllbooks}</span>
                </div>
              </div>
            </div>
            <div className='md:px-5 my-5 md:my-0'>
              <div className='bg-green-900 p-4 flex items-center text-2xl rounded text-white'>
                <LuUsers />
                <div className='flex ms-2'>
                  <h3>Total No:of Users :</h3>
                  <span className='ms-3'>{allUsers}</span>
                </div>
              </div>
            </div>
            <div className='md:px-5 my-5 md:my-0'>
              <div className='bg-yellow-900 p-4 flex items-center text-2xl rounded text-white'>
                <IoDocumentSharp />
                <div className='flex ms-2'>
                  <h3>Job Application :</h3>
                  <span className='ms-3'>50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default AdminDashboard