import React, { useEffect, useState } from 'react'
import Header from "../../Common/Components/Header"
import { FaRegEye } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCameraRetro } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { makePaymentAPI, viewBookAPI } from '../../service/allAPIs';
import { serverURL } from '../../service/ServerURL';
import { loadStripe } from "@stripe/stripe-js";

function ViewBook() {
  const [modalStatus, setModalStatus] = useState(false)
  const [bookData, setBookData] = useState({})
  const { id } = useParams()
  console.log(id);

  const getBookDetails = async () => {
    const token = sessionStorage.getItem("token")
    // reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await viewBookAPI(id, reqHeader)
      console.log(result);
      if (result.status == 200) {
        setBookData(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(bookData);



  // payment
  const handlePayment = async () => {
    console.log(`inside Payment Function`);
    const stripe = await loadStripe('pk_test_51SLjEk38kmP7Clp84Sn5gWxy1eZ6Ijq6MPffbLomuQ0yBtnineDn8wGDodEdzIWWadf4TFPt2HNgZoypsatbIQvf00YLr7j0J4');
    console.log(stripe);

    const token = sessionStorage.getItem("token")
    if (token) {
      // reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await makePaymentAPI(bookData, reqHeader)
        console.log(result);
        if (result.status === 200) {
          window.location.href = result.data.checkoutSessionURL;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }




  useEffect(() => {
    getBookDetails()
  }, [])

  return (
    <>
      <Header />
      {/*  */}
      <div className='md:m-10 m-5'>
        <div className='border p-5 shadow border-gray-200'>
          <div className='md:grid grid-cols-4 gap-x-10'>
            <div>
              <img src={bookData?.imageURL} alt="" />
            </div>
            <div className='col-span-3'>
              <div className='flex justify-between mt-5 md:mt-0' >
                <h1 className='font-bold'>{bookData?.title}</h1>
                <FaRegEye onClick={() => setModalStatus(true)} className='text-2xl' />
              </div>
              <p className='text-blue-500'>{bookData?.author}</p>
              <div className='md:grid grid-cols-3 gap-5 my-10'>
                <p>Publisher : {bookData?.publisher}</p>
                <p>Language : {bookData?.language}</p>
                <p>No:of Pages : {bookData?.noOfPages}</p>
                <p>seller Mail : {bookData?.userMail}</p>
                <p>Real Price : {bookData?.price}</p>
                <p>Discount-price : {bookData?.discountPrice}</p>
                <p>ISBN number : {bookData?.isbn}</p>
                <p>Category : {bookData?.category}</p>
              </div>
              <div className='md:my-10 my-4'>
                <p>{bookData?.abstract}</p>
              </div>
              <div className='flex justify-end'>
                <Link to={"/books"} className='bg-blue-900 text-white p-2 rounded-start'>Back</Link>
                <button onClick={handlePayment} type='button' className='bg-green-900 text-white p-2 ms-5 rounded-start'>BUY NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      {modalStatus &&
        <div className='relative z-10 overflow-y-auto'>
          <div className='bg-gray-500/75 fixed inset-0'>
            <div className='flex justify-center items-center min-h-screen scroll-auto'>
              <div className='bg-white rounded-2xl md:w-250 w-100'>
                <div className='bg-black text-white flex justify-between items-center p-3'>
                  <h3>Book Name</h3>
                  <IoMdCloseCircle onClick={() => setModalStatus(false)} className='text-2xl' />
                </div>
                <div className=' p-5 flex'>
                  <FaCameraRetro className='mt-1 me-3' /> <p> Camera Click of the book in the hand of seller.</p>
                </div>
                <div className='md:flex flex-wrap my-4 overflow-y-auto gap-5 p-5 justify-center items-center'>
                  {
                    bookData?.uploadImages?.length > 0 ?
                      bookData?.uploadImages?.map((img, index) => (
                        <img key={index} className='' width={"250px"} height={"250px"} src={`${serverURL}/uploadImages/${img}`} alt="" />
                      ))
                      :
                      <h1>No Images Uploaded!!!</h1>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default ViewBook