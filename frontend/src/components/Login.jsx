import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/user/userSlice';
import review from '../assets/review.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error)

  useEffect(() => {
    if (userData.activeUser !== null) {
      navigate('/feedback-app-tailwind-vite/');
    }
  }, [userData]);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginForm));
    setLoginForm({
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
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className=''>
            <label htmlFor="username" className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>
              Username
            </label>
            <input
              onChange={handleChange}
              value={loginForm.username}
              id="username"
              name="username"
              type="text"
              className={`w-full h-12 input ${error === "User dosent exsist" ? 'outline-red' : 'outline-transparent'}`}
              placeholder="johnd"
            />
            {error === "User dosent exsist" && <p className='mt-1 text-red text-sm md:text-sm'>User doesn't exist</p>}
          </div>
          <div className=''>
            <label htmlFor="password" className='px13 tracking-[-0.18px] text-blue font-bold mb-1 md:text-sm'>
              Password
            </label>
            <input
              onChange={handleChange}
              value={loginForm.password}
              id="password"
              name="password"
              type="password"
              className={`w-full h-12 input ${error === "Incorrect password" ? 'outline-red' : 'outline-transparent'}`}
              placeholder="johndoe123"
            />
            {error === "Incorrect password" && <p className='mt-1 text-red text-sm md:text-sm'>Incorrect password</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Not a member?{' '}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;