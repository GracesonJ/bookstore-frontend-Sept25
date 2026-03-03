import React, { useEffect, useState } from 'react'
import Header from "../../Common/Components/Header"
import { Link } from 'react-router-dom'
import { getAllBooksAPI } from "../../service/allAPIs"

function Books() {

  const [token, setToken] = useState("")
  const [allBooks, setAllBooks] = useState([])
  const [tempBooks, setTempBooks] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [searchKey, setSearchKey] = useState("")

  const getAllbooks = async () => {
    if (token) {
      // reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getAllBooksAPI(searchKey, reqHeader)
        console.log(result);
        setAllBooks(result.data)
        setTempBooks(result.data)
        const tempArray = result.data.map(item => item.category)
        // console.log(tempArray);
        const tempCategory = [...new Set(tempArray)]
        setAllCategories(tempCategory)

      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(token);
  console.log(allBooks);

  const filterBook = (category) => {
    if (category == "No Filter") {
      setAllBooks(tempBooks)
    } else {
      setAllBooks(tempBooks?.filter(item => item.category == category))
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    getAllbooks()
  }, [token, searchKey])

  return (
    <>
      <Header />

      <div className='flex justify-center items-center flex-col my-5'>
        <h1 className='text-3xl font-bold my-5'>Collections</h1>
        <div className='flex my-5 gap-2'>
          <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Search by Title' className='p-2 border border-gray-200 text-black w-100 placeholder-gray-600' />
          <button className='bg-blue-900 text-white p-2 rounded rounded-2'>Search</button>
        </div>
      </div>

      {/* grid */}
      <div className='md:grid grid-cols-4 md:px-20 p-5 mb-10'>
        <div className='col-span-1 shadow p-4 rounded rounded-3'>
          <h1 className='text-2xl font-bold'>Filter</h1>
          <div className='mt-5'>
            {
              allCategories?.map((item, index) => (
                <li key={index} className='ms-4'>
                  <div onClick={() => filterBook(item)} className='mt-3'>
                    <label>{item}</label>
                  </div>
                </li>
              ))
            }
            <li className='ms-4'>
              <div onClick={() => filterBook("No Filter")} className='mt-3'>
                <label >No Filter</label>
              </div>
            </li>


          </div>
        </div>
        <div className='col-span-3'>
          <div className='md:grid grid-cols-4 mt-5 md:mt-0'>
            {
              allBooks?.length > 0 ?
                allBooks?.map((book, index) => (
                  <div key={index} className='shadow rounded p-3 mx-4 mt-5' hidden={book?.status == "pending" || book?.status == "sold"}>
                    <img width={"100%"} height={"300px"} src={book?.imageURL} alt="" />
                    <div className='flex flex-col justify-center items-center'>
                      <p className='text-blue-700 font-bold text-lg'>{book?.title}</p>
                      <p>{book?.author}</p>
                      <p className='text-red-700 font-bold'>₹{book?.discountPrice}</p>
                    </div>
                    <div className='flex justify-center items-center mt-3'>
                      <Link to={`/view/${book?._id}/book`} className='bg-blue-800 p-2 text-white w-100  text-center'>View Book</Link>
                    </div>
                  </div>
                ))
                :
                <h1>No Books Available yet!!!</h1>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Books