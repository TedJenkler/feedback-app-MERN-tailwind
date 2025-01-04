import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../features/social/socialSlice';
import check from "../assets/check.png";
import arrowIcon from "../assets/arrowdownblue.svg";

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
            <p className='px13 text-grey font-normal mb-4 md:text-sm'>
                {description}
            </p>
            <div
                className='w-full px15 bg-grey-white2 h-12 px-6 flex items-center justify-between focus:outline focus:outline-1 focus:outline-strong-blue rounded-xl md:px15 cursor-pointer'
                onClick={toggleSelect}
            >
                {value && (
                    <span className='text-blue'>{categories.find((category) => category._id === value)?.name}</span>
                )}
                <img
                    src={arrowIcon}
                    className={`h-2 w-4 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    alt="Dropdown arrow"
                />
            </div>
            <div
                className={`absolute mt-1 w-full bg-grey-white2 shadow-lg rounded-xl z-10 transition-all duration-300 ease-in-out transform ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
                {categories.map((category, index) => (
                    <div
                        key={category._id}
                        className={`flex justify-between px15 font-normal items-center border-b text-base h-[2.938rem] text-blue py-2 cursor-pointer px-6 ${value === category._id ? "text-purple" : ""} ${index === categories.length - 1 ? "rounded-[0.625rem]" : ""}`}
                        onClick={() => handleInputChange(category._id)}
                    >
                        {category.name}
                        <img className={`w-[0.688rem] h-[0.469rem] ${value === category._id ? "" : "hidden"}`} src={check} alt='checked' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySelect;