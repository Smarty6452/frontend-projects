import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/Store'; // Import store
import { selectToken } from './redux/features/authSlice'; // Import selectToken from authSlice
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct'; // Import the SingleProduct component

const PrivateRoute = ({ element, ...props }) => {
  const token = useSelector(selectToken);
  return token ? element : <Navigate to="/" />;
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
