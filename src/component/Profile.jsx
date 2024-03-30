import React, { useEffect, useState } from 'react'
import { getRedirectPath } from './getRedirectPath';
import { useNavigate } from 'react-router-dom';
import userEndpoint from '../services/mm-endpoint-service';
import { CanceledError } from 'axios';

const Profile = () => {

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    

    const[user, setUser] = useState({});
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        if(!userId){
            navigate('/');
        }
        const { request, cancel } = userEndpoint.get(userId);
        request
          .then((res) => {            
            setData(res.data);
            setLoading(false); 
          })
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            setLoading(false); 
            console.error(err);
          });
    
        return () => cancel();
      }, []);
    

  return (
    <div>Profile</div>
  )
}

export default Profile