import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdSpaceDashboard } from "react-icons/md";
import { RiBookShelfLine } from "react-icons/ri";
import { RiGraduationCapFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { serverURL } from '../../service/ServerURL';
import { adminUpdateContext } from '../../ContextAPI/ContextShare';

function AdminSidebar() {

    const [profileImage, setProfileImage] = useState("")
    const [username, setUsername] = useState("")
    const {adminEditResponse} = useContext(adminUpdateContext)

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const data = JSON.parse(sessionStorage.getItem("existingUser"))
            setProfileImage(data?.profileImg)
            setUsername(data?.username)
        }
    }, [adminEditResponse])

    return (
        <>
            <div className='bg-blue-100 md:min-h-screen h-fit md:flex text-center flex-col py-10'>
                <div className='flex justify-center'>
                    <img width={"150px"} height={"150px"} style={{ borderRadius: "50%" }} src={profileImage == "" ? "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" : `${serverURL}/uploadImages/${profileImage}`} alt="" />
                </div>
                <h1 className='mt-3'>{username}</h1>
                <div className='md:text-left mx-auto mt-5'>
                    <div className='mt-5'>
                        <Link to={"/admin-dashboard"} className='flex'><MdSpaceDashboard className='mt-1 me-1' /> Dashboard</Link>
                    </div>
                    <div className='mt-5'>
                        <Link to={"/admin-books"} className='flex'><RiBookShelfLine className='mt-1 me-1' /> Books</Link>
                    </div>
                    <div className='mt-5'>
                        <Link to={"/admin-careers"} className='flex'><RiGraduationCapFill className='mt-1 me-1' />Careers</Link>
                    </div>
                    <div className='mt-5'>
                        <Link to={"/admin-settings"} className='flex'><IoSettings className='mt-1 me-1' />Settings</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar