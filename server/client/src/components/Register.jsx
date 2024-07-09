import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/user/userSlice';
import review from '../assets/review.png';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (userData.activeUser !== null) {
      navigate('/feedback-app-tailwind-vite/');
    }
  }, [userData, navigate]);

  const [registerForm, setRegisterForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    username: false,
    password: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value
    });
    setFormErrors({
      ...formErrors,
      [name]: false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormErrors = {
      firstname: !registerForm.firstname,
      lastname: !registerForm.lastname,
      email: !registerForm.email,
      username: !registerForm.username,
      password: !registerForm.password
    };

    setFormErrors(newFormErrors);

    if (Object.values(newFormErrors).some(error => error)) {
      return;
    }

    dispatch(register(registerForm));

    setRegisterForm({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: ''
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white2 bg-bgs md:bg-bgmd xl:bg-bgxl bg-center z-10 bg-no-repeat">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="relative max-w-md w-[87.2%] p-6 bg-white rounded-lg shadow-md brightness-100 z-10">
        <img className="mx-auto h-10 w-auto" src={review} alt="Feedback App" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register a new account
        </h2>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className=''>
            <label htmlFor="firstname" className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>
              First Name
            </label>
            <input
              onChange={handleChange}
              value={registerForm.firstname}
              id="firstname"
              name="firstname"
              type="text"
              className={`w-full h-12 input ${formErrors.firstname ? 'outline-red' : 'outline-transparent'}`}
              placeholder="John"
            />
            {formErrors.firstname && <p className='mt-1 text-red text-sm md:text-sm'>First name is required</p>}
          </div>
          <div className=''>
            <label htmlFor="lastname" className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>
              Last Name
            </label>
            <input
              onChange={handleChange}
              value={registerForm.lastname}
              id="lastname"
              name="lastname"
              type="text"
              className={`w-full h-12 input ${formErrors.lastname ? 'outline-red' : 'outline-transparent'}`}
              placeholder="Doe"
            />
            {formErrors.lastname && <p className='mt-1 text-red text-sm md:text-sm'>Last name is required</p>}
          </div>
          <div className=''>
            <label htmlFor="email" className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>
              Email
            </label>
            <input
              onChange={handleChange}
              value={registerForm.email}
              id="email"
              name="email"
              type="email"
              className={`w-full h-12 input ${formErrors.email ? 'outline-red' : 'outline-transparent'}`}
              placeholder="john@example.com"
            />
            {formErrors.email && <p className='mt-1 text-red text-sm md:text-sm'>Email is required</p>}
          </div>
          <div className=''>
            <label htmlFor="username" className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>
              Username
            </label>
            <input
              onChange={handleChange}
              value={registerForm.username}
              id="username"
              name="username"
              type="text"
              className={`w-full h-12 input ${formErrors.username ? 'outline-red' : 'outline-transparent'}`}
              placeholder="johnd"
            />
            {formErrors.username && <p className='mt-1 text-red text-sm md:text-sm'>Username is required</p>}
          </div>
          <div className=''>
            <label htmlFor="password" className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>
              Password
            </label>
            <input
              onChange={handleChange}
              value={registerForm.password}
              id="password"
              name="password"
              type="password"
              className={`w-full h-12 input ${formErrors.password ? 'outline-red' : 'outline-transparent'}`}
              placeholder="johndoe123"
            />
            {formErrors.password && <p className='mt-1 text-red text-sm md:text-sm'>Password is required</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already a member?{' '}
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;