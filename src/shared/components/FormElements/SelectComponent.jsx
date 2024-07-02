// SelectComponent.js
import React from 'react';
import './SelectComponent.css';
import { FaChevronDown } from 'react-icons/fa';

const SelectComponent = ({
  id,
  label,
  onChange,
  options,
  defaultValue = '',
}) => {
  return (
    <div className={`select-control`}>
    <select id={id} onChange={onChange}>
      <option value={defaultValue}>{label}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}  </select>
      <FaChevronDown className='fa-chevron-down'/>
  </div>
  );
};

export default SelectComponent;
