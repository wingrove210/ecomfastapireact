import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import { registerNewUser } from '../redux/user.slice';
import background_1 from '../assets/Blackgroud img 1.svg';
import background_2 from '../assets/Blackgroud img 2.svg';

export default function RegisterScreen() {
  const registerstate = useSelector((state) => state.registerReducer);

  const { loading, error, success } = registerstate;

  const [name, setname] = useState('');
  const [email, setemail] = useState('');

  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
      is_staff: false,
      is_active: true
    };

    if (password === cpassword) {
      dispatch(registerNewUser(user));
    } else {
      alert('passwords not matched');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
              <img className='absolute bottom-0 left-0' src={background_1} alt='' />
      <img className='absolute top-[30vh] right-0' src={background_2} alt='' />
      <div className="w-[20vw] max-w-md mt-[-20px]">
      <div className="bg-[#FAFAFA] shadow-lg shadow-[#DAEFDE] p-6 rounded-3xl">
        <h2 className="text-left text-2xl font-semibold mb-6 text-green-500">РЕГИСТРАЦИЯ</h2>


          {loading && <Loader />}
          {error && <Error error="Email Address is already registered" />}
          {success && <Success success="Your Registration is successful" />}

          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={password}
              required
              onChange={(e) => setpassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={cpassword}
              required
              onChange={(e) => setcpassword(e.target.value)}
            />

            <div className="text-right">
            <button
                type="submit"
                className="bg-green-500 text-white w-full py-2 rounded-3xl uppercase"
              >
                Регестрация
              </button>
            </div>
          </form>
          <div className='flex items-center justify-center gap-3 mt-3'>
            <span className='bg-[#DAEFDE] w-[5vw] h-[2px]'></span>
            <span className='text-green-600 text-sm'>ИЛИ</span>
            <span className='bg-[#DAEFDE] w-[5vw] h-[2px]'></span>
          </div>
          <a href="/login" className="block mt-3 text-center w-full bg-[#F2F4F5] py-2 rounded-3xl uppercase border-[1px] border-green-500">
          Войти как гость
          </a>
        </div>
      </div>
    </div>
  );
}
