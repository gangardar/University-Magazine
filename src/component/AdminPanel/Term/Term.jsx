import React, { useEffect, useState } from 'react'
import TableComponent from '../ReusableComponents/TableComponent'
import axios, { CanceledError } from 'axios'
import TableSkeleton from '../ReusableComponents/TableSkeleton';
import AddTerm from './AddTerm';
import { formatDateToYYYYMMDD } from '../../dateUtil';
import endpointService from '../../../services/endpoint-term';
import BulkDelete from '../ReusableComponents/BulkDelete';
import { Container } from 'react-bootstrap';
import UpdateTerm from './UpdateTerm';

const Term = () => {
  const [data, setData] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [Error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedTermId, setSelectedTermId] = useState([]); 

  const [updateModalState, setUpdateModalState] = useState(false);
  const [toUpdateFacultyData , setToUpdateFacultyData] = useState(null);

  useEffect(() => {
    const {request,cancel} = endpointService.getAll();
    request.then((res) => {
      const reorderedData = res.data.sort((a, b) => a.id - b.id);
      setData(res.data)
      setLoading(false); 
      console.log(res.data)
    }).catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
      setLoading(false); 
      console.log(Error);
    })

    return () => cancel();
  }, []);

  if (loading) {
    return <TableSkeleton columnCount={6}/>; 
  }
  const handleUpdateModalClose = () => {
    setUpdateModalState(false);
  };

  const handleUpdateModalOpen = (id) => {
    setSelectedTermId(id);

    const faculty = data.filter((item)=> item.id === id);
    setToUpdateFacultyData(faculty);

    setUpdateModalState(true);

  };

  const onUpdate = (term) => {
    if (selectedTermId !== null) {
        endpointService.update(selectedTermId, term)
            .then(() => {
                // Update the local state with the updated data
                const updatedData = [...data];
                const termIndex = updatedData.findIndex((item) => item.id === selectedTermId);
                if (termIndex !== -1) {
                    updatedData[termIndex] = term;
                    setData(updatedData);
                }
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                console.log(err);
            });

        // Close the modal
        handleUpdateModalClose();
    }
};





const onDelete = (id) =>{
  const originalFaculties = [...data];
  const confirmDelete = window.confirm('Are you sure you want to delete this term?');
  if(confirmDelete){
    const updatedData = data.filter((data) => data.id !== id);
    setData(updatedData);

    endpointService.delete(id).catch((err) => {
      setError(err.message);
      setData(originalFaculties);
    })
  }    
}

  const onSelectStateChange = (id) => {
    setSelectState((prevSelectedState) => {
      const updatedState = prevSelectedState.includes(id)
        ? prevSelectedState.filter((item) => item !== id)
        : [...prevSelectedState, id];
      return updatedState;
    });
  };

  const handleModalSubmit = (term) => {
    const originalTerm = [...data];
    const newTerm = { ...term }; 

    ['startDate', 'endDate', 'lastSubmitDate'].forEach((item) => {
              if (newTerm[item] instanceof Date) {
                  newTerm[item] = formatDateToYYYYMMDD(newTerm[item]);
              }
          });

    let id;
        if (data.length === 0) {
            id = 1;
        } else {
            const lastIndex = data.length - 1;
            const lastRow = data[lastIndex];
            id = lastRow.id + 1;
        }
    const newRow = { id: id, ...newTerm };

    endpointService.create(newTerm)
        .then((response) => {
            setData([...data, newRow]);
        })
        .catch((err) => {
            // Handle error
            setError(err);
            setData(originalTerm);
        });
};


//   const handleModalSubmit = (term) => {
//     const originalTerm = [...data];
//     const newTerm = { ...term }; 

//     ['startDate', 'endDate', 'lastSubmitDate'].forEach((item) => {
//         if (newTerm[item] instanceof Date) {
//             newTerm[item] = formatDateToYYYYMMDD(newTerm[item]);
//         }
//     });

//     let id;
//     if (data.length === 0) {
//         id = 1;
//     } else {
//         const lastIndex = data.length - 1;
//         const lastRow = data[lastIndex];
//         id = lastRow.id + 1;
//     }
    
//     const newRow = { id: id, ...newTerm };
//     console.log(newTerm);
//     const formData = new FormData();
//     formData.append('name', newTerm.name);
//     formData.append('startDate', newTerm.startDate);
//     formData.append('lastSubmitDate', newTerm.lastSubmitDate);
//     formData.append('endDate', newTerm.endDate);
//     setData([...data, newRow]);

//     endpointService.create(formData)
//     .catch((err) => {
//       setError(err);
//       setData(originalTerm);
//     });
// };

  return (
    <>
    <Container className="mt-5 w-md-50">
    <UpdateTerm
          handleModalClose={handleUpdateModalClose}
          modalState={updateModalState}
          handleModalSubmit={onUpdate}
          termData={toUpdateFacultyData}
        />
      <div className='d-flex justify-content-end mb-3'>
        <BulkDelete data={selectState}/>
        <AddTerm handleModalSubmit={handleModalSubmit} />
      </div>

      <TableComponent 
      data={data} 
      onDelete={onDelete} 
      onUpdate={handleUpdateModalOpen}
      onSelectStateChange={onSelectStateChange} 
      currentSelectState={selectState}/>
    </Container>
        
        
    </>
  )
}

export default Term;
