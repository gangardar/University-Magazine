import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ManagerEndPointService from "../../../services/mm-endpoint-service";
import BulkDelete from "../ReusableComponents/BulkDelete";
import { CanceledError } from "axios";
import UserTable from "../ReusableComponents/UserTable";
import endpointService from "../../../services/endpoint-service";
import UpdateUser from "../ReusableComponents/UpdateUser";
import AddUser from "../ReusableComponents/AddUser";
import TableSkeleton from "./TableSkeleton";

const UserController = ({Role}) => {

  const [data, setData] = useState([]); 
  const [Error, setError] = useState();
  const[faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true); 

  const [selectedState, setSelectedState] = useState([]);
  // Update Modal State
  const [updateModalState, setUpdateModalState] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState([]);
  const [toUpdateFacultyData , setToUpdateFacultyData] = useState(null);

  useEffect(() => {
    console.log('Updated data:', data);
  }, [data]);


  useEffect(() => {
    let managerCancel, endpointCancel;
  
    const fetchData = async () => {
      try {
        const { request: managerRequest, cancel: managerCancelFn } = ManagerEndPointService.getAll();
        const { request: endpointRequest, cancel: endpointCancelFn } = endpointService.getAll();
  
        managerCancel = managerCancelFn;
        endpointCancel = endpointCancelFn;
  
        const [managerResponse, endpointResponse] = await Promise.all([managerRequest, endpointRequest]);

        const sortedManagerData = managerResponse.data.sort((a, b) => a.id - b.id);
        const sortedFacultyData = endpointResponse.data.sort((a, b) => a.id - b.id);
        setLoading(false);
        setData(sortedManagerData);
        console.log(data);
        setFaculty(sortedFacultyData);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setLoading(false);
        setError(err.message);
      }
    };
  
    fetchData();
  
    return () => {
      if (managerCancel) managerCancel();
      if (endpointCancel) endpointCancel();
    };
  }, []);

  if (loading) {
    return <TableSkeleton columnCount={5}/>; 
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

  const handleUpdate = async (faculty) => {
    if (selectedFacultyId !== null) {
      // Find the index of the faculty with the selected ID
      const facultyIndex = data.findIndex((item) => item.id === selectedFacultyId);
  
      if (facultyIndex !== -1) {
        // Update the data with the new faculty information
        const updatedData = [...data];
        updatedData[facultyIndex] = { ...updatedData[facultyIndex], name: faculty.name };
  
        try {
          // Create a new FormData object
          const formData = new FormData();
  
          // Append profilePhoto to formData if a new file is selected
          if (faculty.profilePhoto[0] instanceof File) {
            formData.append('profilePhoto', faculty.profilePhoto[0]);
          }
  
          // Append other form data fields
          formData.append('name', faculty.name);
          formData.append('role', faculty.role);
          formData.append('faculty', faculty.faculty);
  
          // Send formData to the server using fetch or axios
          await ManagerEndPointService.update(selectedFacultyId, formData);
  
          // Set the updated data in the state
          setData(updatedData);
        } catch (err) {
          if (err instanceof CanceledError) return;
          setError(err.message);
          console.error(err);
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

      ManagerEndPointService .delete(id).catch((err) => {
        setError(err.message);
        setData(originalFaculties);
      })
    }    
  }

  const handleBulkDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete selected faculties?');
    if (confirmDelete) {
      const originalFaculties = [...data];
      const deletedIds = [];
      console.log("started");
      // Delete each selected faculty one by one
      selectedState.forEach((id) => {
        ManagerEndPointService.delete(id)
          .then(() => {
            // Keep track of successfully deleted ids
            deletedIds.push(id);
            // Remove the deleted faculty from the data state
            setData(prevData => prevData.filter(faculty => faculty.id !== id));
          })
          .catch((err) => {
            setError(err.message);
          });
      });
  
      // Filter out the deleted faculties from the data
      const updatedData = data.filter((faculty) => !deletedIds.includes(faculty.id));
      setData(updatedData);
    }
  };
  
  
  
  

  const handleModalSubmit = (formData) => {
    const originalData = [...data];
  
    // Generate a new unique ID for the user
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
  
    // Extract profile photo data
    const profilePhoto = formData.profilePhoto[0];
  
    // Create a new user object with the generated ID
    const newUser = {
      name: formData.name,
      password: formData.password,
      role: formData.role,
      faculty: formData.faculty,
      profilePhoto: profilePhoto ? profilePhoto : null, // Assign profile photo data or null
    };

    const newUserWithId = {
      id: id,
      name: formData.name,
      password: formData.password,
      role: formData.role,
      faculty: formData.faculty,
      profilePhoto: profilePhoto ? profilePhoto : null, // Assign profile photo data or null
    };
  
    // Update the local state with the new user data
    setData([...originalData, newUserWithId]);
  
    // Send the new user data to the backend to be saved
    ManagerEndPointService.create(newUser)
      .then((response) => {
        // Handle successful creation of user
        console.log("User added successfully:", response);
      })
      .catch((err) => {
        // Handle errors
        setError(err);
        setData(originalData); // Reset to original data in case of error
      });
  };

  return (
    <>
      <Container className="mt-5 w-md-50">
        <UpdateUser
          handleModalClose={handleUpdateModalClose}
          modalState={updateModalState}
          handleModalSubmit={handleUpdate}
          data={toUpdateFacultyData}
          faculty={faculty}
          role={Role}
        />
        <div className='d-flex justify-content-end mb-3'>
          <BulkDelete data={selectedState} bulkDelete={handleBulkDelete}/>
        <AddUser handleModalSubmit={handleModalSubmit} Role={Role} faculty={faculty} />
        </div>
        
        <UserTable
          data={data}
          onDelete={handleDelete} // Add your delete logic here
          onUpdate={handleUpdateModalOpen}
          onSelectStateChange={onSelectStateChange}
          currentSelectState={selectedState}
          filterRole={Role}
        />
      </Container>
    </>
  );
};

export default UserController;
