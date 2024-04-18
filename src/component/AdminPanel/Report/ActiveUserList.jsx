import React, { useState } from 'react';

const ActiveUserList = ({ data, maxItemsToShow }) => {
  const [showAll, setShowAll] = useState(false);
  // Create a copy of the data array before sorting
  const sortedData = [...data].sort((a, b) => b.logins - a.logins);
  const displayedData = showAll ? sortedData : sortedData.slice(0, maxItemsToShow);

  const handleClick = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>      
        {displayedData.map((item, index) => (
          <li
            key={index}
            style={{
              padding: '10px',
              marginBottom: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
            }}
          >
            {`${item.name}`}
          </li>
        ))}
      </ul>
      <button style={{ marginTop: '10px' }} onClick={handleClick}>
        {!showAll ? "...more" : "...less"}
      </button>
    </div>
  );
};

export default ActiveUserList;
