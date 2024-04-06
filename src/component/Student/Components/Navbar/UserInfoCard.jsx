import React from 'react';
import './UserInfoCard.css'; // Import CSS for styling (create this file)

const UserInfoCard = ({ user }) => {
  return (
    <div className="user-info-card">
      <div className="profile-photo">
        <img src={user?.profilePhoto} alt="Profile" />
      </div>
      <div className="user-details">
        <div className="user-name">{user?.name}</div>
        <div className="user-role">{user?.role}</div>
      </div>
    </div>
  );
};

export default UserInfoCard;
