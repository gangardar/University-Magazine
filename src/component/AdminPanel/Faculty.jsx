import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { facultyData } from "./Data";
import AddFaculty from "./AddFaculty";
import UpdateFaculty from "./UpdateFaculty";
import BulkDelete from "./ReusableComponents/BulkDelete";
import TableComponent from "./ReusableComponents/TableComponent";

const Faculty = () => {
  const [data, setData] = useState(facultyData);
  const [selectedState, setSelectedState] = useState([]);
  // Update Modal State
  const [updateModalState, setUpdateModalState] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState([]);
  const [toUpdateFacultyData , setToUpdateFacultyData] = useState(null);

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
        updatedData[facultyIndex] = { id: selectedFacultyId, name: faculty.facultyName };

        // Set the updated data in the state
        setData(updatedData);
      }
    }
    

    // Close the modal
    handleUpdateModalClose();
  };

  const handleDelete = (id) =>{
    const confirmDelete = window.confirm('Are you sure you want to delete this faculty?');
    if(confirmDelete){
      const updatedData = data.filter((data) => data.id !== id);
      setData(updatedData);
    }    
  }

  const handleBulkDelete = () =>{
    // const confirmDelete = window.confirm('Are you sure you want to delete selected faculty?');
    // if(confirmDelete){
    //   const updatedData = data.filter((data) => {selectedFacultyId.map(id)=> data.id !== id})
    // }
  }

  const handleModalSubmit = (faculty) => {
    let lastIndex = data.length -1;
    const db = data[lastIndex];
    const id = db.id +1;
    const newRow = { id: id, name: faculty.facultyName };
    setData((data) => [...data, newRow]);
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
