import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { selectToken, clearToken } from "../redux/features/authSlice";
import axios from "axios";
import AllProducts from "../components/AllProducts";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa'; 
import { selectCartItems } from '../redux/features/authSlice';

const Home = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      setCurrentUser(userData);

      fetchProducts();
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data);
      setLoading(false); // Set loading to false after products are fetched
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleLogout = () => {
    dispatch(clearToken()); 
    navigate("/"); 
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-gray-200">
        {currentUser && (
          <div className="flex items-center">
             
            <img
              src={currentUser.image}
              alt="User Avatar"
              className="w-12 h-12 rounded-full mr-2"
            />
            <div>
              <p className="m-0">Welcome, {currentUser.firstName}!</p>
              <p className="m-0 text-sm">Email: {currentUser.email}</p>
            </div>
          </div>
        )}
        <div>
          <div className="flex items-center ">
          <div className="relative mr-10">
          <FaShoppingCart className="text-2xl" />
          {cartItems.length > 0 && (
            <div className="absolute -right-5 -top-3 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs">
              {cartItems.length}
            </div>
          )}
        </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleLogout}>Logout</button>
          </div>
       
        </div>
      </nav>

      <AllProducts />

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
