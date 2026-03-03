import React, { useEffect, useState } from 'react'
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

function Header() {
    const [listStatus, setListStatus] = useState(false)
    const [dropdownStatus, setDropdownStatus] = useState(false)
    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token")
            setToken(tok)

            const userDetails = JSON.parse(sessionStorage.getItem("existingUser"))
            setUsername(userDetails.username)

        }
    })

    return (
        <>
            <div className='grid grid-cols-3 p-3'>
                {/* logo */}
                <div className='flex items-center'>
                    <img width={"80px"} height={"80px"} src="https://png.pngtree.com/png-vector/20221105/ourmid/pngtree-book-vector-design-white-bookstore-logo-vector-png-image_40318404.jpg" alt="" />
                    <h1 className='text-2xl font-bold md:hidden'>BOOKSTORE</h1>
                </div>
                <div className='md:flex justify-center items-center hidden'>
                    <h1 className='text-2xl font-bold'>BOOKSTORE</h1>
                </div>
                <div className='md:flex justify-end items-center gap-3 me-5 hidden'>
                    <FaInstagramSquare className='text-2xl' />
                    <FaXTwitter className='text-2xl' />
                    <FaFacebookSquare className='text-2xl' />
                    {!token ?
                        <Link to={"/login"}>
                            <button className='border border-black rounded px-3 py-2 ms-2 hover:bg-black hover:text-white'>Login</button>
                        </Link>
                        :
                        <div className='relative inline-block text-left'>
                            <button onClick={() => setDropdownStatus(!dropdownStatus)} className='w-full justify-center items-center flex bg-white px-3 py-2 shadow-xs hover:bg-gray-50'>
                                <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740&q=80" width={"40px"} height={"40px"} alt="Profile Image" className='mx-2' />
                                <span>{username}</span>
                            </button>
                            {
                                dropdownStatus &&
                                <div className='absolute right-0 z-10  mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg '>
                                    <div className='py-1'>
                                        <Link to={"/profile"} className='block px-4 py-2 text-sm text-gray-700'>Profile</Link>
                                        <button className='block px-4 py-2 text-sm text-gray-700'>Logout</button>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            <nav className='w-full bg-black p-3 text-white md:flex justify-center items center'>
                <div className='flex justify-between items-center text-2xl md:hidden'>
                    <button onClick={() => setListStatus(!listStatus)}><GiHamburgerMenu /></button>
                    <Link to={"/login"}><button className='border border-black rounded px-3 py-2 ms-2 hover:bg-black hover:text-white'>Login</button></Link>
                </div>

                <ul className={listStatus ? "flex flex-col" : 'md:flex justify-center items-center hidden'}>
                    <Link to={"/"}><li className='mx-4 '>Home</li></Link>
                    <Link to={"/books"}><li className='mx-4 '>Books</li></Link>
                    <Link to={"/careers"}><li className='mx-4 '>Careers</li></Link>
                    <Link to={"/contact"}><li className='mx-4 '>Contact</li></Link>
                </ul>
            </nav>
        </>
    )
}

export default Header