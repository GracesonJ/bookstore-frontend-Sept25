import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import { approveBookAPI, getAllAdminBooksAPI, getAllUsersAPI } from '../../service/allAPIs'
import { serverURL } from '../../service/ServerURL'

function AdminBooks() {
  const [bookListStatus, setbookListStatus] = useState(true)
  const [userListStatus, setUserListStatus] = useState(false)
  const [token, setToken] = useState("")
  const [userList, setUserList] = useState([])

  const [allBooks, setAllBooks] = useState([])


  const getAllBooks = async () => {
    // reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getAllAdminBooksAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setAllBooks(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(allBooks);

  // approve book
  const approveBook = async (id) => {
    // reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await approveBookAPI(id, reqHeader)
      console.log(result);
      getAllBooks()

    } catch (error) {
      console.log(error);
    }
  }

  // get all users
  const getAllUsers = async () => {
    // reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getAllUsersAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setUserList(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    if (token) {
      getAllBooks()
      getAllUsers()
    }
  }, [token, userListStatus])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>

        <div className='col-span-4 p-10'>
          <h1 className='text-3xl text-center font-bold'>All Collections</h1>
          <div className='flex justify-center items-center my-8 font-medium text-lg'>
            <p onClick={() => { setUserListStatus(false), setbookListStatus(true) }} className={bookListStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Books</p>
            <p onClick={() => { setUserListStatus(true), setbookListStatus(false) }} className={userListStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>User</p>
          </div>
          {/* books */}

          {bookListStatus &&
            <div className='md:grid grid-cols-4 w-full my-5'>
              {
                allBooks?.length > 0 ?
                  allBooks?.map((book, index) => (
                    <div key={index} className='shadow rounded p-3 mx-4'>
                      <img width={"100%"} height={"300px"} src={book?.imageURL} alt="" />
                      <div className='flex flex-col justify-center items-center'>
                        <p className='text-blue-700 font-bold text-lg'>{book?.title}</p>
                        <p>{book?.author}</p>
                        <p className='text-red-700 font-bold'>₹{book?.discountPrice}</p>
                      </div>
                      {
                        book?.status == "pending" ?
                          <button onClick={() => approveBook(book?._id)} type='button' className="w-full mt-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition font-semibold">
                            Approve
                          </button>
                          :
                          book?.status == "approved" ?
                            <img src="https://e7.pngegg.com/pngimages/302/913/png-clipart-approved-approved-thumbnail.png" style={{
                              width: "50px", borderRadius: "50%"
                            }} alt="" />
                            :
                            <p className='mt-3 text-center text-white bg-red-400 rounded'>SOLD</p>
                      }


                    </div>
                  ))
                  :
                  <p>No Books Added Yet!!!</p>
              }
            </div>
          }

          {/* users */}
          {userListStatus &&
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
              {
                userList?.length > 0 ?
                  userList?.map((user, index) => (
                    <div key={index} className="shadow-md bg-white rounded-lg p-4 hover:shadow-xl transition">
                      <p className="text-red-600 font-bold">ID : {user?._id} </p>
                      <div className="flex items-center mt-4">
                        <img
                          src={user?.profileImg==""? "https://cdn-icons-png.flaticon.com/512/149/149071.png" : `${serverURL}/uploadImages/${user?.profileImg}`}
                          width="80"
                          height="80"
                          className="rounded-full"
                          alt="Profile Image"
                        />
                        <div className="ml-4 w-full">
                          <p className="text-blue-800 font-bold text-lg">
                            {user?.username}
                          </p>
                          <p className="text-gray-700">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  ))

                  :
                  <p className="text-red-700 font-semibold text-center mt-10 text-xl">
                    No Users Available...
                  </p>
              }





            </div>
          }
        </div>


      </div>
    </>
  )
}

export default AdminBooks