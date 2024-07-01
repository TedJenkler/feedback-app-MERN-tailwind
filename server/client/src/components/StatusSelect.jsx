import React, { useEffect, useRef, useState } from 'react';

const statusOptions = [
    { value: 'planned', label: 'Planned' },
    { value: 'in-progress', label: 'In-Progress' },
    { value: 'live', label: 'Live' },
];

const StatusSelect = ({ value, onChange, label = 'Update Status', description = 'Change feature state' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const handleInputChange = (status) => {
        onChange(status);
        setIsOpen(false);
    };

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const closeSelect = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', closeSelect);
        return () => {
            document.removeEventListener('mousedown', closeSelect);
        };
    }, []);

    return (
        <div ref={containerRef} className='relative mb-6'>
            <label htmlFor='status' className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>
                {label}
            </label>
            <p className='px13 text-grey font-normal mb-4 md:text-sm'>
                {description}
            </p>
            <div
                className='w-full px13 bg-grey-white2 h-12 px-4 flex items-center justify-between focus:outline-strong-blue rounded-xl md:px15 cursor-pointer'
                onClick={toggleSelect}
            >
                <span className='text-blue'>{statusOptions.find((option) => option.value === value)?.label || 'Select status'}</span>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-5 w-5 ${isOpen ? 'transform rotate-180' : ''}`}
                    viewBox='0 0 20 20'
                    fill='currentColor'
                >
                    <path
                        fillRule='evenodd'
                        d='M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z'
                    />
                </svg>
            </div>
            {isOpen && (
                <div className='absolute mt-1 w-full bg-grey-white2 shadow-lg rounded-xl z-10'>
                    {statusOptions.map((option) => (
                        <div
                            key={option.value}
                            className='px13 text-blue py-2 cursor-pointer hover:bg-gray-100 text-center'
                            onClick={() => handleInputChange(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatusSelect;