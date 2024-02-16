// CartInfo.js

import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/features/authSlice';

const CartInfo = () => {
  const cartItems = useSelector(selectCartItems);

  const cartCount = cartItems.length;
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <span>Cart Count: {cartCount}</span>
      <span>Total Amount: ${totalPrice}</span>
    </div>
  );
};

export default CartInfo