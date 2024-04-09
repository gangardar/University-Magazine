import React, { useState } from 'react';

const FilterComponent = ({ faculties, academicYears, users, onFilterChange }) => {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const handleFilterChange = () => {
    // Pass the selected filter values to the parent component
    onFilterChange(selectedFaculty, selectedAcademicYear, selectedUser);
  };

  return (
    <div className="filter-container">
      <select
        value={selectedFaculty}
        onChange={(e) => setSelectedFaculty(e.target.value)}
      >
        <option value="">Select Faculty</option>
        {faculties.map((faculty) => (
          <option key={faculty.id} value={faculty.id}>
            {faculty.name}
          </option>
        ))}
      </select>

      <select
        value={selectedAcademicYear}
        onChange={(e) => setSelectedAcademicYear(e.target.value)}
      >
        <option value="">Select Academic Year</option>
        {academicYears.map((year) => (
          <option key={year.id} value={year.id}>
            {year.name}
          </option>
        ))}
      </select>

      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default FilterComponent;
