import React from 'react'

function AdminHeader() {
    return (
        <>
            <div className='flex justify-between items-center p-3 md:px-20'>
                <div className='flex items-center'>
                    <img width={"80px"} height={"80px"} src="https://png.pngtree.com/png-vector/20221105/ourmid/pngtree-book-vector-design-white-bookstore-logo-vector-png-image_40318404.jpg" alt="" />
                    <h1 className='text-2xl font-bold'>BOOKSTORE</h1>
                </div>
               <button className='border border-black rounded px-3 py-2 ms-2 hover:bg-black hover:text-white'>Logout</button>
            </div>
        </>
    )
}

export default AdminHeader