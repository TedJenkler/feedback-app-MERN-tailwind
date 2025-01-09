import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import check from '../assets/check.png';
import arrowIcon from '../assets/arrowdown.svg';

const SortSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const state = useSelector(state => state.state.sortBy);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = optionValue => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <div
        className={`flex items-center justify-between bg-dark-blue ${isOpen ? 'text-white/75' : 'text-white'} cursor-pointer font-bold`}
        onClick={toggleDropdown}
      >
        <div className='truncate'>{value}</div>
        <img
          src={arrowIcon}
          className={`ml-2 inline-block h-2 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          alt='Dropdown arrow'
        />
      </div>
      {isOpen && (
        <div
          className={`absolute -left-[3.75rem] top-10 w-[15.938rem] transform rounded-b-[10px] bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex h-12 cursor-pointer items-center justify-between border-b bg-white px-6 text-base text-gray-700 ${index === options.length - 1 ? 'rounded-b-[10px]' : ''} ${state === option.label ? 'text-purple' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
              <img
                className={`h-[0.469rem] w-[0.688rem] ${state === option.label ? '' : 'hidden'}`}
                src={check}
                alt='check'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortSelect;
