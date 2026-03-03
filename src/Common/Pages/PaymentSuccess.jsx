import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'

function PaymentSuccess() {

    return (
        <>
            <Header />
            <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
                <div>
                    <h1 className='text-6xl text-blue-700'>Congratulations!!!</h1>
                    <p className='mt-5 mb-10'>Thankyou for shopping with BookStore. Hope you have a good time with us.</p>
                    <Link className='px-4 py-3 bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600' to={"/all-books"}>Explore More Books...</Link>
                </div>
                <div>
                    <img src="https://funtura.in/wp-content/themes/funtura/assets/images/success.svg" className='w-3/4 ms-30' alt="" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentSuccess