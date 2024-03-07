import React from 'react'
import { Button } from 'react-bootstrap'

const BulkDelete = (data) => {
    const isEmpty = data.data.length === 0;
  return (
    <>
    {!isEmpty && <Button className='m-1' onClick={console.log("Bulk deleted")} variant='danger'>Delete</Button>}    
    </>
  )
}

export default BulkDelete