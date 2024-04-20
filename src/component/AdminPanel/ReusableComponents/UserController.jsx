import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BulkDelete from "../ReusableComponents/BulkDelete";
import UserTable from "../ReusableComponents/UserTable";
import UpdateUser from "../ReusableComponents/UpdateUser";
import AddUser from "../ReusableComponents/AddUser";
import TableSkeleton from "./TableSkeleton";
import useUser from "../../../services/Queries/User/useUser";
import useFaculty from "../../../services/Queries/Faculty/useFaculty"
import ErrorMessage from "../../Feedback/ErrorMessage";
import useUpdateUser from "../../../services/Queries/User/useUpdateUser";
import useUserCreate from "../../../services/Queries/User/useUserCreate";
import useRemoveUser from "../../../services/Queries/User/useRemoveUser";
import SuccessMessage from "../../Feedback/SuccessMessage";

const UserController = ({Role}) => {

  const [data, setData] = useState([]); 
  const[faculty, setFaculty] = useState([]);

  const [selectedState, setSelectedState] = useState([]);
  // Update Modal State
  const [updateModalState, setUpdateModalState] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState([]);
  const [toUpdateFacultyData , setToUpdateFacultyData] = useState(null);

  const { data: userData, isLoading: isUserFetchLoading,
     isError: isUserFetchError, error : userFetchError, refetch : refetchUser } = useUser();

  const { data: facultyData, isLoading: isFacultyFetchLoading,
     isError: isFacultyFetchError, error : facultyFetchError, refetch : refetchFaculty } = useFaculty();

  const {mutateAsync: updateUser, isError : isUserUpdateError,
     isSuccess : isUserUpdateSuccess, error : userUpdateError} = useUpdateUser();

  const {mutateAsync: createUser, isError: isUserCreateError,
     isSuccess : isUserCreateSuccess, error : userCreateError} = useUserCreate();

  const {mutateAsync: deleteUser, isError : isUserDeleteError, 
    isSuccess : isUserDeleteSuccess, error : userDeleteError} = useRemoveUser();


  useEffect(() => {
    console.log('Updated data:', data);
  }, [data]);

  useEffect(() => {
      const sortedUserData = userData?.sort((a, b) => a.id - b.id) || [];
      setData(sortedUserData);
  }, [userData]);

  useEffect(() => {
    const sortedFacultyData = facultyData?.sort((a, b) => a.id - b.id) || [];
    setFaculty(sortedFacultyData);

  },[facultyData]);

  if (isFacultyFetchLoading || isUserFetchLoading) {
    return <TableSkeleton columnCount={5} />;
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
  
          // Send formData to the server using fetch or axios
          updateUser({selectedFacultyId, faculty})
          .then(() => {
            setData(updatedData);
            refetchUser();
          }                
          ).catch(() => {
            refetchUser();
          })
      }
    }
    // Close the modal
    handleUpdateModalClose();
  };
  
  const handleDelete = (id) => {
    const originalUser = {...data};
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const updatedData = data?.filter((faculty) => faculty.id !== id);
      setData(updatedData);
      deleteUser(id).then(
        refetchUser()
      ).catch(() => {
        setData(originalUser);
        refetchFaculty();
      })
    }    
  };
  

  const handleBulkDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete selected users?');
    if (confirmDelete) {
      const originalData = [...data];
      const deletedIds = [];
      // Delete each selected faculty one by one
      selectedState.forEach((id) => {

        deleteUser(id)
          .then(() => {
            // Keep track of successfully deleted ids
            deletedIds.push(id);
            setData(prevData => prevData.filter(faculty => faculty.id !== id));
            refetchUser();
          })
          .catch(() => {
            setData(originalData);
            refetchUser();
          });
      });
      setSelectedState([]);
  
      // Filter out the deleted faculties from the data
      const updatedData = data.filter((faculty) => !deletedIds.includes(faculty.id));
      setData(updatedData);
    }
  };
  
  const handleModalSubmit = (formData) => {
    const originalData = [...data];
    let id;
    if (data.length === 0) {
      id = 1;
    } else {
      const lastIndex = data.length - 1;
      const lastRow = data[lastIndex];
      id = lastRow.id + 1;
    }
    const profilePhoto = formData.profilePhoto[0];
    const newUser = {
      name: formData.name,
      password: formData.password,
      role: formData.role,
      email :formData.email,
      faculty: formData.faculty,
      profilePhoto: profilePhoto ? profilePhoto : null,
    };

    const newUserWithId = {
      id: id,
      name: formData.name,
      password: formData.password,
      email : formData.email,
      role: formData.role,
      faculty: formData.faculty,
      profilePhoto: profilePhoto ? profilePhoto : null, 
    };
    setData([...originalData, newUserWithId]);
    
    createUser(newUser).then(() =>{
      refetchUser();
    })
    .catch(() => {
      setData(originalData);
      refetchUser();
    })
  };

  return (
    <>
    {isUserFetchError && <ErrorMessage message={userFetchError} />}
    {isUserCreateSuccess && <SuccessMessage message={"User Added Successfully!"} />}
    {isUserCreateError && <ErrorMessage message={userCreateError} />}
    {isUserUpdateSuccess && <SuccessMessage message={"User Updated Successfully!"} />}
    {isUserUpdateError && <ErrorMessage message={userUpdateError} />}
    {isUserDeleteSuccess && <SuccessMessage message={"User Deleted Successfully!"} />}
    {isUserDeleteError && <ErrorMessage message={userDeleteError} />}
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
