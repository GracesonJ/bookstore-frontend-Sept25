import React from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'

function AdminCareers() {
  return (
    <>
    <AdminHeader />
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>

        <div className='col-span-4 p-10'>
          Admin Careers
        </div>

      </div>
    </>
  )
}

export default AdminCareers