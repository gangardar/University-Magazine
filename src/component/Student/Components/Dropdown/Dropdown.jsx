import React, { useState, useEffect } from 'react';
import '../Dropdown/Dropdown.css';
import ArrowDownSvg from '../../../../assets/arrow-down.svg';
import ArrowUpSvg from '../../../../assets/arrow-up.svg';
import FilterSvg from '../../../../assets/filter.svg'
import axios from 'axios';


const Dropdown = ({ status, academicYearData, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onOptionSelect(option.id);
    setSelectedOption(option.name);
    setIsOpen(false);
  };

  if (status == "marketingCoHome") {
    return (
      <div style={{ width: '160px' }}>
        <div style={{
          border: '1px solid black',
          borderRadius: '10px',
          width: '120px',
          display: 'flex',
          height: '35px',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }} onClick={toggleDropdown} >
          {selectedOption ? (
            <span style={{ fontSize: '12px' }}>{selectedOption}</span>
          ) : (
            <span style={{ fontSize: '12px' }}>{academicYearData && academicYearData.length > 0 ? academicYearData[0].name : null}</span>
          )}
          {isOpen ? (
            <img src={ArrowUpSvg} alt='' className='arrow-up' style={{ marginLeft: '10px', width: '16px' }} />
          ) : (
            <img src={ArrowDownSvg} alt='' className='arrow-down' style={{ marginLeft: '10px', width: '14px' }} />
          )}
        </div>
        {isOpen && (
          <div style={{
            width: '100%',
            position: 'absolute',
            zIndex: '1',
            background: 'white',
            width: '150px',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            paddingLeft: '0px'
          }}>
            {academicYearData && academicYearData.length > 0 &&
              academicYearData.map((option) => (
                <div
                  key={option.id}
                  className='dropdown-item'
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.name}
                </div>
              ))
            }
          </div>
        )}
      </div>
    );
  } else if (status == "filter") {
    return (
      <div style={{ width: '160px' }}>
        <div style={{
          border: '1px solid black',
          borderRadius: '10px',
          width: '120px',
          display: 'flex',
          height: '35px',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }} onClick={toggleDropdown} >
          {selectedOption ? (
            <span style={{ fontSize: '12px' }}>{selectedOption}</span>
          ) : (
            <span style={{ fontSize: '12px' }}>{academicYearData && academicYearData.length > 0 ? academicYearData[0].name : null}</span>
          )}

          <img src={FilterSvg} alt='' className='arrow-down' style={{ marginLeft: '10px', width: '16px', height: '16px' }} />

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
            paddingLeft: '0px'
          }}>
            {academicYearData && academicYearData.length > 0 &&
              academicYearData.map((option) => (
                <div
                  key={option.id}
                  className='dropdown-item'
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))
            }
          </div>
        )}
      </div>
    )
  }
  else {
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
            <span>{academicYearData && academicYearData.length > 0 ? academicYearData[0].name : null}</span>
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
            {academicYearData && academicYearData.length > 0 &&
              academicYearData.map((option) => (
                <div
                  key={option.id}
                  className='dropdown-item'
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.name}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }

};

export default Dropdown;