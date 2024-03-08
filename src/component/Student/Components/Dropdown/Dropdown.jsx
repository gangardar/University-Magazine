import React, { useState } from 'react';
import '../Dropdown/Dropdown.css';
import ArrowDownSvg from '../../../../assets/arrow-down.svg';
import ArrowUpSvg from '../../../../assets/arrow-up.svg';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const termsOption = ['2021-2022', '2022-2023', '2023-2024',];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div style={{ width: '160px' }}>
      <div style={{
        border: '1px solid black',
        borderRadius: '10px',
        width: '150px',
        display: 'flex',
        height: '45px',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }} onClick={toggleDropdown} >
        {selectedOption ? (
          <span>{selectedOption}</span>
        ) : (
          <span>{termsOption[0]}</span>
        )}
        {isOpen ? (
          <img src={ArrowUpSvg} alt='' className='arrow-up' style={{ marginLeft: '10px' }} />
        ) : (
          <img src={ArrowDownSvg} alt='' className='arrow-down' style={{ marginLeft: '10px' }} />
        )}
      </div>
      {isOpen && (
        <div style={{
          width: '100%', position: 'absolute',
          zIndex: '1',
          background: 'white',
          width: '150px',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          paddingLeft: '10px'
        }}>
          {termsOption.map((option) => (
            <div
              key={option}
              className='dropdown-item'
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;