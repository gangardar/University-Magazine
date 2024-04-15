import React, { useEffect, useState } from 'react'
import TableComponent from '../ReusableComponents/TableComponent'
import TableSkeleton from '../ReusableComponents/TableSkeleton';
import AddTerm from './AddTerm';
import { formatDateToYYYYMMDD } from '../../dateUtil';
import endpointService from '../../../services/endpoint-term';
import BulkDelete from '../ReusableComponents/BulkDelete';
import { Container } from 'react-bootstrap';
import UpdateTerm from './UpdateTerm';
import useAcademic from '../../../services/Queries/Academic/useAcademic';
import useAcademicUpdate from '../../../services/Queries/Academic/useAcademicUpdate';
import useAddArticle from '../../../services/Queries/Academic/useAddAcademic';
import ErrorMessage from '../../Feedback/ErrorMessage';
import SuccessMessage from '../../Feedback/SuccessMessage';
import useRemoveAcademic from '../../../services/Queries/Academic/useRemoveAcademic';

const Term = () => {
  const [data, setData] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [selectedTermId, setSelectedTermId] = useState([]); 

  const [updateModalState, setUpdateModalState] = useState(false);
  const [toUpdateFacultyData , setToUpdateFacultyData] = useState(null);

  const {data : academicData, isLoading : isAcademicFetchLoading,
     isAcademicFetchError, error : academicFetchError} = useAcademic();

  const {mutateAsync : updateAcademic, isError : isAcademicUpdateError, 
    isSuccess : isAcademicUpdateSuccess, error : academicUpdateError} = useAcademicUpdate();

  
  const {mutateAsync : createAcademic, isError : isAcademicAddError,
     isSuccess : isAcademicAddSuccess, error : academicAddError} = useAddArticle();

  const {mutateAsync: deleteAcademic, isError : isAcademicDeleteError,
     isSuccess : isAcademicDeleteSuccess, error : academicDeleteError } = useRemoveAcademic();
  

  useEffect(() => {
    const reorderedData = academicData?.sort((a, b) => a.id - b.id);

    setData(reorderedData);
  }, [academicData]);

  if (isAcademicFetchLoading) {
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
        updateAcademic({selectedTermId, term})
            .then(() => {
                // Update the local state with the updated data
                const updatedData = [...data];
                const termIndex = updatedData.findIndex((item) => item.id === selectedTermId);
                if (termIndex !== -1) {
                    updatedData[termIndex] = term;
                    setData(updatedData);
                }
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

    deleteAcademic(id).catch(() => {
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

    createAcademic(newTerm)
        .then(() => {
            setData([...data, newRow]);
        })
        .catch((err) => {
            setData(originalTerm);
        });
  };

  const handleBulkDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete selected Academy?');
    if (confirmDelete) {
      const originalData = [...data];
      const deletedIds = [];
      selectState.forEach((id) => {
        deleteAcademic(id)
          .then(() => {
            deletedIds.push(id);
            setData(prevData => prevData.filter(faculty => faculty.id !== id));
          })
          .catch(() => {
            setData(originalData);
          });
      });
      setSelectState([]);
    }
  };
  

  return (
    <>
    {isAcademicFetchError && <ErrorMessage message={academicFetchError} />}
    {isAcademicAddSuccess && <SuccessMessage message={"New academic term added successfully!"} />}
    {isAcademicAddError && <ErrorMessage message={academicAddError} />}
    {isAcademicUpdateSuccess && <SuccessMessage message={"Academic term updated successfully!"} />}
    {isAcademicUpdateError && <ErrorMessage message={academicUpdateError} />}
    {isAcademicDeleteSuccess && <SuccessMessage message={"Academic term deleted successfully!"} />}
    {isAcademicDeleteError && <ErrorMessage message={academicDeleteError} />}
    <Container className="mt-5 w-md-50">
    <UpdateTerm
          handleModalClose={handleUpdateModalClose}
          modalState={updateModalState}
          handleModalSubmit={onUpdate}
          termData={toUpdateFacultyData}
        />
      <div className='d-flex justify-content-end mb-3'>
        <BulkDelete data={selectState} bulkDelete={handleBulkDelete}/>
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
