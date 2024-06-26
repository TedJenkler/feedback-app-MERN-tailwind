import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../features/social/socialSlice';

const CategorySelect = ({ value, onChange, label = 'Category', description = 'Choose a category for your feedback' }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.social.categories);

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const handleInputChange = (categoryId) => {
        onChange(categoryId);
        setIsOpen(false);
    };

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

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
            <label htmlFor='category' className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>
                {label}
            </label>
            <p className='px13 text-grey font-normal mt-2 md:text-sm'>
                {description}
            </p>
            <div
                className='w-full px13 bg-grey-white2 h-12 px-4 flex items-center justify-between focus:outline-strong-blue rounded-xl md:px15 cursor-pointer'
                onClick={toggleSelect}
            >
                {value && (
                    <span>{categories.find((category) => category._id === value)?.name}</span>
                )}
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
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className='px13 py-2 cursor-pointer hover:bg-gray-100 text-center'
                            onClick={() => handleInputChange(category._id)}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategorySelect;