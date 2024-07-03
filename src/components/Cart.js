// src/components/Cart.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeItem, increase, decrease, calculateTotals } from '../redux/cartSlice';
import { CartIcon, ChevronDown, ChevronUp } from '../constants/icons';
import styled from 'styled-components';

const CartContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemInfo = styled.div`
  flex: 2;
  text-align: left;

  h4 {
    margin: 5px 0;
  }

  p {
    margin: 5px 0;
    color: #555;
  }
`;

const ItemActions = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: 0 10px;
  }
`;

const ClearCartButton = styled.button`
  background: #ff6b6b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background 0.3s;

  &:hover {
    background: #ff4d4d;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff4d4d;
  }
`;

const Cart = () => {
  const { cartItems, totalAmount, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <CartContainer>
      <h2>Your Cart</h2>
      <ClearCartButton onClick={() => dispatch(clearCart())}>Clear Cart</ClearCartButton>
      {cartItems.map((item) => (
        <CartItem key={item.id}>
          <img src={item.img} alt={item.title} style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
          <ItemInfo>
            <h4>{item.title}</h4>
            <p>{item.singer}</p>
            <p>{item.price}원</p>
          </ItemInfo>
          <ItemActions>
            <button onClick={() => dispatch(increase(item.id))}><ChevronUp /></button>
            <p>{item.amount}</p>
            <button onClick={() => dispatch(decrease(item.id))}><ChevronDown /></button>
          </ItemActions>
          <RemoveButton onClick={() => dispatch(removeItem(item.id))}><CartIcon /></RemoveButton>
        </CartItem>
      ))}
      <h3>Total Amount: {totalAmount}</h3>
      <h3>Total Price: {totalPrice}원</h3>
    </CartContainer>
  );
};

export default Cart;
