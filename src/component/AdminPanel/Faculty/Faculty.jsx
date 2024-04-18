import React, { useEffect, useState } from "react";
import {Container } from "react-bootstrap";
import AddFaculty from "./AddFaculty";
import UpdateFaculty from "./UpdateFaculty";
import BulkDelete from "../ReusableComponents/BulkDelete";
import TableComponent from "../ReusableComponents/TableComponent";
import TableSkeleton from "../ReusableComponents/TableSkeleton";
import useFaculty from "../../../services/Queries/Faculty/useFaculty";
import useAddFaculty from "../../../services/Queries/Faculty/useAddFaculty";
import SuccessMessage from "../../Feedback/SuccessMessage";
import ErrorMessage from "../../Feedback/ErrorMessage";
import useUpdateFaculty from "../../../services/Queries/Faculty/useUpdateFaculty";
import useRemoveFaculty from "../../../services/Queries/Faculty/useRemoveFaculty";

const Faculty = () => {

  const [data, setData] = useState([]); 

  const [selectedState, setSelectedState] = useState([]);
  const [updateModalState, setUpdateModalState] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState([]);
  const [toUpdateFacultyData , setToUpdateFacultyData] = useState(null);

  const {data : facultyData, isError : isFacultyFetchError,
     isLoading : facultyFetchLoading, error : facultyFetchError, refetch : refetchFaculty} = useFaculty();

  const {mutateAsync : createFaculty, isError : isFacultyCreateError,
     isSuccess: isFacultyCreateSuccess, error : facultyCreateError} = useAddFaculty();

  const {mutateAsync : updateFaculty, isError : isFacultyUpdateError,
     isSuccess: isFacultyUpdateSuccess, error : facultyUpdateError} = useUpdateFaculty();
    
  const {mutateAsync : deleteFaculty, isError : isFacultyDeleteError,
    isSuccess: isFacultyDeleteSuccess, error : facultyDeleteError} = useRemoveFaculty();

  useEffect(() => {
          const reorderedData = facultyData?.sort((a, b) => a.id - b.id);
            setData(reorderedData);
  }, [facultyData]);

  if (facultyFetchLoading) {
    return <TableSkeleton columnCount={4}/>; 
  }


  const onSelectStateChange = (id) => {
    setSelectedState((prevSelectedState) => {
      const updatedState = prevSelectedState.includes(id)
        ? prevSelectedState.filter((item) => item !== id)
        : [...prevSelectedState, id];

      console.log(updatedState);
      return updatedState;
    });
  };

  const handleUpdateModalClose = () => {
    setUpdateModalState(false);
  };

  const handleUpdateModalOpen = (id) => {
    setSelectedFacultyId(id);

    const faculty = data.filter((item)=> item.id === id);
    setToUpdateFacultyData(faculty);

    setUpdateModalState(true);

  };

  const handleUpdate = (faculty) => {
    if (selectedFacultyId !== null) {
      // Find the index of the faculty with the selected ID
      const facultyIndex = data.findIndex((item) => item.id === selectedFacultyId);

      if (facultyIndex !== -1) {
        // Update the data with the new faculty information
        const updatedData = [...data];
        updatedData[facultyIndex] = { id: selectedFacultyId, name: faculty.name };
        updateFaculty({faculty, selectedFacultyId})
        .then(() => {
          setData(updatedData);
          refetchFaculty();
          handleUpdateModalClose();
        });
        if(isFacultyUpdateSuccess){
          setData(updatedData);
        }
      }
    }
    

    // Close the modal
    handleUpdateModalClose();
  };

  const handleDelete = (id) =>{
    const originalFaculties = [...data];
    const confirmDelete = window.confirm('Are you sure you want to delete this faculty?');
    if(confirmDelete){
      const updatedData = data.filter((data) => data.id !== id);
      setData(updatedData);

      deleteFaculty(id)
      .then(() => {
          refetchFaculty(); // Refetch after mutation is successful
      }).catch(() => {
        setData(originalFaculties); // Update data only after successful mutation
        refetchFaculty();
      })
     
    }    
  }

  const handleBulkDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete selected faculties?');
    if (confirmDelete) {
      const originalData = [...data];
      const deletedIds = [];
      selectedState.forEach((id) => {
        deleteFaculty(id)
          .then(() => {
            deletedIds.push(id);
            refetchFaculty();
          })
          .catch((err) => {
            setData(originalData);
          });
      });
      const updatedData = data.filter((faculty) => !deletedIds.includes(faculty.id));
      setData(updatedData);
      refetchFaculty();
      setSelectedState([]); // Clear selected state
    }
  };
  

  const handleModalSubmit = (faculty) => {
    const originalFaculty = [...data];
    
    let id;
    if (data.length === 0) {
      // If data is empty, set id to 1 or any starting value you prefer
      id = 1;
    } else {
      // Get the id based on the last element in the data array
      const lastIndex = data.length - 1;
      const lastRow = data[lastIndex];
      id = lastRow.id + 1;
    }
    
    // Include both id and name properties when adding a new faculty
    const newRow = { id: id, name: faculty.name };
    setData((data) => [...data, newRow]);
    
    createFaculty(faculty).then(() => {
      refetchFaculty();
    }).catch(() => {
      setData(originalFaculty);
    })
    
  };
  
  

  return (
    <>
    {isFacultyCreateSuccess && <SuccessMessage message={"Faculty Added Successfully!"} />}
    {isFacultyCreateError && <ErrorMessage message={facultyCreateError}/>}
    {isFacultyUpdateSuccess && <SuccessMessage message={"Faculty Updated Successfully!"} />}
    {isFacultyUpdateError && <ErrorMessage message={facultyUpdateError}/>}
    {isFacultyDeleteSuccess && <SuccessMessage message={"Faculty Deleted Successfully"}/>}
    {isFacultyDeleteError && <ErrorMessage message={facultyDeleteError} />}
      <Container className="mt-5 w-md-50">
        <UpdateFaculty
          handleModalClose={handleUpdateModalClose}
          modalState={updateModalState}
          handleModalSubmit={handleUpdate}
          facultyData={toUpdateFacultyData}
        />
        <div className='d-flex justify-content-end mb-3'>
          <BulkDelete data={selectedState} bulkDelete={handleBulkDelete}/>
        <AddFaculty handleModalSubmit={handleModalSubmit} />
        </div>
        
        <TableComponent
          data={data}
          onDelete={handleDelete} // Add your delete logic here
          onUpdate={handleUpdateModalOpen}
          onSelectStateChange={onSelectStateChange}
          currentSelectState={selectedState}
        />
      </Container>
    </>
  );
};

export default Faculty;
