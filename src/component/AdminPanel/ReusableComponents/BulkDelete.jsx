import React from 'react'
import { Button } from 'react-bootstrap'

const BulkDelete = ({data, bulkDelete}) => {
    const isEmpty = !data || data.length === 0;
    return (
        <>
            {!isEmpty && <Button className='m-1' onClick={bulkDelete} variant='danger'>Delete</Button>}    
        </>
    )
}

export default BulkDelete
