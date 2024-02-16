import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectProductId } from '../redux/features/authSlice';
import { addToCart } from '../redux/features/authSlice';

const SingleProduct = () => {
  const productId = useSelector(selectProductId);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return <div>Error: Unable to fetch product</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover object-center"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray-800 font-semibold">${product.price}</span>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
