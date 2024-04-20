import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestController from '../../component/AdminPanel/Guest/GuestController'

const GuestAdminPage = () => {
  return (
    <>
        <h2 className='m-3'>Guest</h2>
        <GuestController/>
    </>
  )
}

export default GuestAdminPage