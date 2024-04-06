import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AddFaculty from "./AddFaculty";
import UpdateFaculty from "./UpdateFaculty";
import BulkDelete from "../ReusableComponents/BulkDelete";
import TableComponent from "../ReusableComponents/TableComponent";
import endpointService from "../../../services/endpoint-service";
import { CanceledError } from "axios";
import TableSkeleton from "../ReusableComponents/TableSkeleton";

const Faculty = () => {

  const [data, setData] = useState([]); 
  const [Error, setError] = useState();
  const [loading, setLoading] = useState(true); 

  const [selectedState, setSelectedState] = useState([]);
  const [updateModalState, setUpdateModalState] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState([]);
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
      console.log(Error);setError(err.message);
    })

    return () => cancel();
  }, []);

  if (loading) {
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

        endpointService.update(selectedFacultyId, faculty)
        .then(() => setData(updatedData))
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          console.log(Error);
        })

        // Set the updated data in the state
        setData(updatedData);
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

      endpointService.delete(id).catch((err) => {
        setError(err.message);
        setData(originalFaculties);
      })
    }    
  }

  const handleBulkDelete = () =>{
    // const confirmDelete = window.confirm('Are you sure you want to delete selected faculty?');
    // if(confirmDelete){
    //   const updatedData = data.filter((data) => {selectedFacultyId.map(id)=> data.id !== id})
    // }
  }

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
    
    endpointService.create(faculty)
      .catch((err) => {
        setError(err);
        setData(originalFaculty);
      });
  };
  
  

  return (
    <>
      <Container className="mt-5 w-md-50">
        <UpdateFaculty
          handleModalClose={handleUpdateModalClose}
          modalState={updateModalState}
          handleModalSubmit={handleUpdate}
          facultyData={toUpdateFacultyData}
        />
        <div className='d-flex justify-content-end mb-3'>
          <BulkDelete data={selectedState}/>
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
