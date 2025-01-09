import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../features/social/socialSlice';
import check from '../assets/check.png';
import arrowIcon from '../assets/arrowdownblue.svg';

const CategorySelect = ({
  value,
  onChange,
  label = 'Category',
  description = 'Choose a category for your feedback',
}) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.social.categories);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleInputChange = categoryId => {
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
    const closeSelect = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
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
      <label
        htmlFor='category'
        className='px13 mb-1 font-bold tracking-[-0.18px] text-blue md:text-sm'
      >
        {label}
      </label>
      <p className='px13 mb-4 font-normal text-grey md:text-sm'>
        {description}
      </p>
      <div
        className='px15 md:px15 flex h-12 w-full cursor-pointer items-center justify-between rounded-xl bg-grey-white2 px-6 focus:outline focus:outline-1 focus:outline-strong-blue'
        onClick={toggleSelect}
      >
        {value && (
          <span className='text-blue'>
            {categories.find(category => category._id === value)?.name}
          </span>
        )}
        <img
          src={arrowIcon}
          className={`h-2 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180 transform' : ''}`}
          alt='Dropdown arrow'
        />
      </div>
      <div
        className={`absolute z-10 mt-1 w-full transform rounded-xl bg-grey-white2 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? 'scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {categories.map((category, index) => (
          <div
            key={category._id}
            className={`px15 flex h-[2.938rem] cursor-pointer items-center justify-between border-b px-6 py-2 text-base font-normal text-blue ${value === category._id ? 'text-purple' : ''} ${index === categories.length - 1 ? 'rounded-[0.625rem]' : ''}`}
            onClick={() => handleInputChange(category._id)}
          >
            {category.name}
            <img
              className={`h-[0.469rem] w-[0.688rem] ${value === category._id ? '' : 'hidden'}`}
              src={check}
              alt='checked'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
