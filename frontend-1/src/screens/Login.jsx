import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/user.slice';
import Error from '../components/Error';
import Loader from '../components/Loader';
import background_1 from '../assets/Blackgroud img 1.svg';
import background_2 from '../assets/Blackgroud img 2.svg';

export default function LoginScreen() {
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const { loading, error, currentUser } = loginReducer;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    dispatch(loginUser(formData));

    navigate('/')
  };

  useEffect(() => {
    if (currentUser && currentUser.jwtToken) {
      navigate('/');
      
    }
  }, [navigate]);
  return (
    <div className="flex justify-center items-center h-screen">
              <img className='absolute bottom-0 left-0' src={background_1} alt='' />
      <img className='absolute top-[30vh] right-0' src={background_2} alt='' />
      <div className="w-[20vw] max-w-md mt-[-40px]">
        <div className="bg-[#FAFAFA] shadow-lg shadow-[#DAEFDE] p-6 rounded-3xl">
          <h2 className="text-left text-2xl font-semibold mb-6 text-green-500">АВТОРИЗАЦИЯ</h2>

          {error && <Error error="Invalid Credentials" />}
          {loading && <Loader />}

          <form onSubmit={login} className='mt-[5vh]'>
            <input
              type="text"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-right">
              <p></p>
              <button
                type="submit"
                className="bg-green-500 text-white w-full py-2 rounded-3xl"
              >
                ВОЙТИ
              </button>
            </div>
          </form>
          <div className='flex items-center justify-center gap-3 mt-3'>
            <span className='bg-[#DAEFDE] w-[5vw] h-[2px]'></span>
            <span className='text-green-600 text-sm'>ИЛИ</span>
            <span className='bg-[#DAEFDE] w-[5vw] h-[2px]'></span>
          </div>
          <a href="/register" className="block mt-3 text-center w-full bg-[#F2F4F5] py-2 rounded-3xl border-[1px] border-green-500">
            РЕГИСТРАЦИЯ
          </a>
        </div>
      </div>
    </div>
  );
}
