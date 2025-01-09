import { useSelector } from 'react-redux';

const loginModal = () => {
  const authState = useSelector(state => state.social.auth);
  console.log(authState);
  return <div></div>;
};

export default loginModal;
