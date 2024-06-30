import React, { useState, useEffect, useRef } from 'react';

const SortSelect = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
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
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex bg-dark-blue text-white2 font-bold cursor-pointer"
                onClick={toggleDropdown}
            >
                <div className="truncate">{value}</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 inline-block ml-2 ${isOpen ? 'transform rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute z-50 -left-[3.75rem] top-10 w-[15.938rem] bg-white rounded-[10px] shadow-lg">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="py-3 text-base px-6 text-grey cursor-pointer hover:bg-gray-100"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortSelect;