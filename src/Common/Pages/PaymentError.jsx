import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'

function PaymentError() {
    return (
        <>
            <Header />

            <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
                <div>
                    <h1 className='text-6xl text-red-700'>Sorry! Your Payment is Unsuccessfull...</h1>
                    <p className='mt-5 mb-10'>We appologize fot the inconvience caused and appreciate your visit to BookStore.</p>
                    <Link className='px-4 py-3 bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600' to={"/all-books"}>Explore More Books...</Link>
                </div>
                <div>
                    <img src="https://png.pngtree.com/png-clipart/20250516/original/pngtree-payment-error-icon-png-image_20994702.png" className='w-3/4 ms-30' alt="" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentError