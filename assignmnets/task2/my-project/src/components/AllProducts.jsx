import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProductId } from '../redux/features/authSlice';
import { FaSearch } from 'react-icons/fa';
import { addToCart } from '../redux/features/authSlice';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleProductClick = (productId) => {
    dispatch(setProductId(productId)); // 
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleSearch = () => {
    axios
      .get(`https://dummyjson.com/products/search?q=${searchQuery}`)
      .then((res) => {
        setSearchResults(res.data.products);
      })
      .catch((error) => {
        console.error('Error searching products:', error);
      });
  };

  const handleFilter = () => {
    let filteredProducts = products;
    if (minPrice !== '') {
      filteredProducts = filteredProducts.filter(product => product.price >= parseInt(minPrice));
    }
    if (maxPrice !== '') {
      filteredProducts = filteredProducts.filter(product => product.price <= parseInt(maxPrice));
    }
    setSearchResults(filteredProducts);
  };

  return (
    <div>
      <div className="flex justify-between   p-5">
        <div>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
            className="border mb-2 md:mb-0 border-gray-300 px-3 py-2 mr-2 rounded-lg focus:outline-none"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
            className="border mb-2 md:mb-0  border-gray-300 px-3 py-2 mr-2 rounded-lg focus:outline-none"
          />
          <button
            className="bg-gray-700  text-white px-4 py-2 mb-2 md:mb-0  rounded-lg"
            onClick={handleFilter}
          >
            Apply Filter
          </button>
        </div>

        <div className='relative'>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="border border-gray-300 px-3 py-2 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="text-white px-4 py-2 rounded-r-lg absolute right-0 top-1"
          >
            <FaSearch color='black' />
          </button>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(searchResults.length > 0 ? searchResults : products).map(product => (
            <div key={product.id} className="h-full">
              <div className="bg-white shadow-md p-4 rounded-lg h-full flex flex-col justify-between">
                <Link to={`/products/${product.id}`} onClick={() => handleProductClick(product.id)}>
                  <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover mb-4 rounded-lg" />
                </Link>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-600 overflow-hidden overflow-ellipsis">{product.description}</p>
                  <p className="text-gray-800 font-semibold mt-2">${product.price}</p>
                </div>
                <button className="px-3 py-2 bg-blue-500 text-sm text-white rounded" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
