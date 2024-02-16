import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../redux/features/authSlice';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        dispatch(setToken(data.token));
        navigate("/home");
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
