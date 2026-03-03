import React, { useContext, useEffect, useState } from 'react'
import Header from "../../Common/Components/Header"
import { MdVerified } from "react-icons/md";
import EditProfile from '../Components/EditProfile';
import { addBookAPI, getAllUserAddedBooksAPI, getUserBoughtBooksAPI, removeUserAddedBookAPI } from '../../service/allAPIs';
import { toast } from 'react-toastify';
import { serverURL } from '../../service/ServerURL';
import { userUpdateContext } from '../../ContextAPI/ContextShare';

function Profile() {
  const [sellBookStatus, setSellBookStatus] = useState(true)
  const [bookStatus, setBookStatus] = useState(false)
  const [purchaseHistory, setPurchaseHistory] = useState(false)
  const [bookDetails, setBookdetails] = useState({
    title: "", author: "", noOfPages: "", imageURL: "", price: "", discountPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", uploadImages: []
  })
  console.log(bookDetails);
  const [preview, setPreview] = useState("")
  const [previewList, setPreviewList] = useState([])
  const [token, setToken] = useState("")
  const [userBooks, setUserBooks] = useState([])
  const [purchasedBooks, setPurchasedBooks] = useState([])
  const [userName, setUserName] = useState("")
  const [userBio, setUserBio] = useState("")
  const [userProfileImage, setUserProfileImage] = useState("")

  const {userEditResponse} = useContext(userUpdateContext)

  // handleUploadBookImage
  const handleUploadBookImage = (e) => {
    console.log(e.target.files);
    const fileArray = bookDetails.uploadImages
    fileArray.push(e.target.files[0])
    setBookdetails({ ...bookDetails, uploadImages: fileArray })

    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);
    setPreview(url)

    const bookImageArray = previewList
    bookImageArray.push(url)
    setPreviewList(bookImageArray)
  }

  console.log(previewList);

  const handleReset = () => {
    setBookdetails({
      title: "", author: "", noOfPages: "", imageURL: "", price: "", discountPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", uploadImages: []
    })
    setPreview("")
    setPreviewList([])
  }

  const handleAddBook = async () => {
    const { title, author, noOfPages, imageURL, price, discountPrice, abstract, publisher, language, isbn, category, uploadImages } = bookDetails
    if (!title || !author || !noOfPages || !imageURL || !price || !discountPrice || !abstract || !publisher || !language || !isbn || !category || uploadImages.length == 0) {
      alert(`Fill the Details Completely`)
    } else {
      // reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      // reqBody
      const reqBody = new FormData()
      // append - reqbody.append("key", value)
      // reqBody.append("title", title)
      // reqBody.append("author", author)

      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqBody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadImages.forEach(img => {
            reqBody.append("uploadImages", img)
          })
        }
      }

      try {
        const result = await addBookAPI(reqBody, reqHeader)
        console.log(result);

        if (result.status == 200) {
          toast.success(`Book Added Successfully!!!`)
          handleReset()
        } else if (result.status == 401) {
          toast.warning(result.response.data)
        } else {
          toast.error(`Something went Wrong!!!`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(token);

  // get all user added books
  const getAllUserAddedBooks = async () => {
    // reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getAllUserAddedBooksAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setUserBooks(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // remove user added book
  const removeBook = async (id) => {
    // reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await removeUserAddedBookAPI(id, reqHeader)
      console.log(result);
      if (result.status == 200) {
        toast.success(`Book Deleted Successfully!!!!`)
        getAllUserAddedBooks()
      } else {
        toast.error(`Something Went Wrong!!!`)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // get user brought book
  const getUserBoughtBook = async () => {
    // reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getUserBoughtBooksAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setPurchasedBooks(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(purchasedBooks);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    getAllUserAddedBooks()
    getUserBoughtBook()
  }, [bookStatus, purchaseHistory])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserName(user?.username)
      setUserBio(user?.bio)
      setUserProfileImage(user?.profileImg)
    }
  }, [userEditResponse])


  return (
    <>
      <Header />
      <div className='bg-black w-full h-40 sm:h-52'></div>

      <div className='flex justify-center sm:justify-start px-4 sm:px-16 -mt-20'>
        <div className='bg-white p-2 rounded-full w-40 h-40 sm:w-56 sm:h-56 shadow-lg'>
          <img
            className='w-full h-full rounded-full object-cover'
            src={userProfileImage == "" ?
              "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3396.jpg?semt=ais_hybrid&w=740&q=80"
            :
            `${serverURL}/uploadImages/${userProfileImage}`
          }
            alt=""
          />
        </div>
      </div>

      {/* Name & Edit Button */}
      <div className='flex flex-col sm:flex-row justify-between px-4 sm:px-16 mt-6'>
        <div className='flex items-center justify-center sm:justify-start'>
          <h1 className='font-bold text-2xl sm:text-3xl'>{userName}</h1>
          <MdVerified className='text-blue-500 ms-2 text-xl sm:text-2xl' />
        </div>

        <div className='flex justify-center sm:justify-end mt-3 sm:mt-0'>
          <EditProfile />
        </div>
      </div>

      {/* Description */}
      <p className='px-4 sm:px-16 my-5 text-justify'>
        {userBio}
      </p>

      {/* tab section */}
      <div className='flex justify-center items-center my-8 font-medium text-lg gap-2'>
        <p onClick={() => { setSellBookStatus(true), setBookStatus(false), setPurchaseHistory(false) }} className={sellBookStatus ? 'text-blue-500 p-4 border-gray-200 border rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Sell Book</p>
        <p onClick={() => { setBookStatus(true), setPurchaseHistory(false), setSellBookStatus(false) }} className={bookStatus ? 'text-blue-500 p-4 border-gray-200 border rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Book Status</p>
        <p onClick={() => { setPurchaseHistory(true), setSellBookStatus(false), setBookStatus(false) }} className={purchaseHistory ? 'text-blue-500 p-4 border-gray-200 border rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Purchase History</p>
      </div>


      {/* sell book */}
      {sellBookStatus &&
        <div>
          <div className='p-10 my-20 mx-5 bg-gray-200'>
            <h1 className='text-center text-3xl font-medium'>Book Details</h1>
            <div className='md:grid grid-cols-2 mt-10 w-full'>
              <div className='px-3'>
                <div className='mb-3'>
                  <input value={bookDetails.title} onChange={(e) => setBookdetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.author} onChange={(e) => setBookdetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.noOfPages} onChange={(e) => setBookdetails({ ...bookDetails, noOfPages: e.target.value })} type="text" placeholder='No:of Pages' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.imageURL} onChange={(e) => setBookdetails({ ...bookDetails, imageURL: e.target.value })} type="text" placeholder='Image URL' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.price} onChange={(e) => setBookdetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.discountPrice} onChange={(e) => setBookdetails({ ...bookDetails, discountPrice: e.target.value })} type="text" placeholder='Discount Price' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <textarea value={bookDetails.abstract} onChange={(e) => setBookdetails({ ...bookDetails, abstract: e.target.value })} type="text" placeholder='Abstract' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
              </div>

              <div className='px-3'>
                <div className='mb-3'>
                  <input value={bookDetails.publisher} onChange={(e) => setBookdetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.language} onChange={(e) => setBookdetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='Langugae' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.isbn} onChange={(e) => setBookdetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.category} onChange={(e) => setBookdetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>

                <div className='mb-3 flex justify-center items-center mt-10'>
                  {!preview ?
                    <label htmlFor="bookImage">
                      <input onChange={(e) => handleUploadBookImage(e)} type="file" id='bookImage' className='hidden' />
                      <img width={"200px"} height={"200px"} src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" alt="" />
                    </label>
                    :
                    <img width={"200px"} height={"150px"} src={preview} alt="" />
                  }
                </div>
                {preview &&
                  <div className='flex justify-center items-center gap-2'>
                    {
                      previewList?.map((imgUrl, index) => (
                        <img key={index} width={"70px"} height={"70px"} src={imgUrl} alt="" />
                      ))
                    }
                    {previewList.length < 3 &&
                      <label htmlFor="bookImage">
                        <input onChange={(e) => handleUploadBookImage(e)} type="file" id='bookImage' className='hidden' />
                        <img width={"70px"} height={"70px"} src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" alt="" />
                      </label>
                    }
                  </div>
                }
              </div>

            </div>
            <div className='p-3 w-full flex md:justify-end justify-center mt-8'>
              <button onClick={handleReset} type='button' className='py-2 px-3 rounded bg-orange-600 text-white hover:bg-white hover:border hover:text-black'>Reset</button>
              <button onClick={handleAddBook} type='button' className='py-2 px-3 rounded bg-green-600 text-white hover:bg-white hover:border hover:text-black ms-4'>Submit</button>
            </div>
          </div>
        </div>
      }
      {/* Book Status */}
      {bookStatus &&
        <div>
          <div className='p-4 sm:p-10 my-10 shadow rounded'>
            {
              userBooks?.length > 0 ?
                userBooks?.map((book, index) => (
                  < div key={index} className='bg-gray-200 p-4 sm:p-8 rounded mt-4'>
                    <div className="grid md:grid-cols-[3fr_1fr] gap-6">
                      <div className='px-2'>
                        <h1 className='text-xl sm:text-2xl'>{book?.title}</h1>
                        <h2>{book?.author}</h2>
                        <h3 className='text-blue-600'>₹ {book?.price}</h3>
                        <p className='text-justify mt-2'>
                          {book?.abstract}
                        </p>
                        <div className='flex gap-4 mt-5 flex-wrap'>
                          {
                            book?.status == "pending" ?
                              <img src="https://static.vecteezy.com/system/resources/thumbnails/022/411/806/small/pending-rubber-stamp-red-pending-rubber-grunge-stamp-seal-illustration-vector.jpg" className='w-18 h-14' />
                              : book?.status == "approved" ?
                                <img src="https://juststickers.in/wp-content/uploads/2017/08/seal-of-approval.png" className='w-14 h-14' />
                                :
                                <img src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" className='w-14 h-14' />
                          }
                        </div>
                      </div>
                      <div className='px-2 flex flex-col justify-center items-center'>
                        <img src={book?.imageURL} className='w-52 h-76 object-cover rounded' />
                        <div className='flex justify-end mt-4'>
                          <button onClick={() => removeBook(book?._id)} type='button' className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))

                :
                <div className='flex flex-col justify-center items-center mt-10'>
                  <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" className='w-40 h-40' />
                  <p className='text-red-600 text-xl sm:text-2xl'>No Book Added Yet</p>
                </div>
            }

          </div >
        </div >
      }


      {/* Purchase History */}
      {
        purchaseHistory &&
        <div>
          <div className='p-4 sm:p-10 my-10 shadow rounded'>
            {
              purchasedBooks?.length > 0 ?
                purchasedBooks?.map((book, index) => (
                  <div key={index} className='bg-gray-200 p-4 sm:p-8 rounded mt-4'>
                    <div className="grid md:grid-cols-[3fr_1fr] gap-6">
                      <div className='px-2'>
                        <h1 className='text-xl sm:text-2xl'>{book?.title}</h1>
                        <h2>{book?.author}</h2>
                        <h3 className='text-blue-600'>₹ {book?.price}</h3>
                        <p className='text-justify mt-2'>
                          {book?.abstract}
                        </p>
                      </div>
                      <div className='px-2 flex flex-col justify-center items-center'>
                        <img src={book?.imageURL} className='w-52 h-76 object-cover rounded' />
                      </div>
                    </div>
                  </div>
                ))
                :
                <div className='flex flex-col justify-center items-center mt-10'>
                  <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" className='w-40 h-40' />
                  <p className='text-red-600 text-xl sm:text-2xl'>No Book Purchased Yet</p>
                </div>
            }
          </div>
        </div>
      }
    </>
  )
}

export default Profile