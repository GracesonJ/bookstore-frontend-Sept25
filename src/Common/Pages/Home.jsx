import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from "../Components/Footer"
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { getHomeBooksAPI } from '../../service/allAPIs';

function Home() {
  const [homeBooks, setHomeBooks] = useState([])

  const getHomeBooks = async () => {
    try {
      const result = await getHomeBooksAPI()
      console.log(result);
      setHomeBooks(result.data)

    } catch (error) {
      console.log(error);
    }
  }
  console.log(homeBooks);

  useEffect(() => {
    getHomeBooks()
  }, [])

  return (
    <>
      <Header />

      {/* landling */}
      <div style={{ height: "500px" }} className='flex flex-col justify-center items-center bg-[url(https://t3.ftcdn.net/jpg/08/15/90/80/360_F_815908053_Mfy2DJfv1iFSdL6ET9pRD5R5VzOOEu5k.jpg)] bg-cover bg-center text-white'>
        <div style={{ height: "500px", backgroundColor: "rgba(0,0,0,0.5" }} className='w-full flex flex-col justify-center items-center'>
          <h1 className='text-5xl font-bold'>Wonderful Gifts</h1>
          <p>Give your family and friends a book</p>
          <div className='mt-9'>
            <input type="text" placeholder='Search Book' className='bg-white p-2 rounded-3xl placeholder-gray-500  w-100 text-black' />
            <IoSearchOutline className='text-gray-500' style={{ marginLeft: "360", marginTop: "-28px" }} />

          </div>
        </div>
      </div>

      {/* New Arraivals */}
      <section className='md:px-40 p-5 my-5 flex flex-col justify-center items-center'>
        <h1 className='text-2xl font-bold'>NEW ARRIVALS</h1>
        <p className=''>Explore Our Latest Collection</p>

        <div className='md:grid grid-cols-4 w-full my-10'>
          {
            homeBooks?.map((book, index) => (
              <div key={index} className='shadow rounded p-3 mx-4'>
                <img width={"100%"} height={"300px"} src={book?.imageURL} alt="" />
                <div className='flex flex-col justify-center items-center'>
                  <p className='text-blue-700 font-bold text-lg'>{book?.title}</p>
                  <p>{book?.author}</p>
                  <p className='text-red-700 font-bold'>₹ {book?.discountPrice}</p>
                </div>
              </div>
            ))
          }

        </div>
        <div>
          <Link to={"/books"} className='bg-blue-800 p-3 text-white font-bold'>Explore More...</Link>
        </div>
      </section>

      <Footer />

    </>
  )
}

export default Home