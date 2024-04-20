import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BulkDelete from "../ReusableComponents/BulkDelete";
import useFaculty from "../../../services/Queries/Faculty/useFaculty"
import ErrorMessage from "../../Feedback/ErrorMessage";
import SuccessMessage from "../../Feedback/SuccessMessage";
import TableSkeleton from "../ReusableComponents/TableSkeleton";
import useGuest from "../../../services/Queries/Guest/useGuest";
import GuestTable from "./GuestTable";
import useApproveGuest from "../../../services/Queries/Guest/useApproveGuest";
import useRejectGuest from "../../../services/Queries/Guest/useRejectGuest";

const GuestController = () => {

  const [data, setData] = useState([]); 
  const[faculty, setFaculty] = useState([]);

  const [selectedState, setSelectedState] = useState([]);

  const { data: userData, isLoading: isUserFetchLoading,
     isError: isUserFetchError, error : userFetchError, refetch : refetchUser } = useGuest()

  const { data: facultyData, isLoading: isFacultyFetchLoading,
     isError: isFacultyFetchError, error : facultyFetchError, refetch : refetchFaculty } = useFaculty();

  const {mutateAsync: approve, isError : isApproveError,
     isSuccess : isApproveSuccess, error : approveError} = useApproveGuest();

  const {mutateAsync: reject, isError: isRejectError,
     isSuccess : isRejectSuccess, error : rejectError } = useRejectGuest();

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

  const handleUpdateModalOpen = (id) => {
   console.log("Approve statred");
   console.log(id);
   approve(id).then(
    () => {
        refetchUser();
    }
   )

  };
  
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to Reject?');
    if (confirmDelete) {
      reject(id).then(
        refetchUser()
      )
    }    
  };
  

  const handleBulkDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete selected request?');
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


  return (
    <>
    {isUserFetchError && <ErrorMessage message={userFetchError} />}
    {isApproveSuccess && <SuccessMessage message={"Guest have been approved Sending mail!"} />}
    {isApproveError && <ErrorMessage message={approveError} />}
    {isRejectSuccess && <SuccessMessage message={"Guest have been rejected."} />}
    {isRejectError && <ErrorMessage message={rejectError} />}
      <Container className="mt-5 w-md-50">
        
        <div className='d-flex justify-content-end mb-3'>
          <BulkDelete data={selectedState} bulkDelete={handleBulkDelete}/>
        </div>
        
        <GuestTable
          data={data}
          onReject={handleDelete} 
          onApprove={handleUpdateModalOpen}
          onSelectStateChange={onSelectStateChange}
          currentSelectState={selectedState}
          filterRole={"Role"}
        />
      </Container>
    </>
  );
};

export default GuestController;
