import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import './cart-dropdown.styles.scss';

import React from 'react'

const CartDropdown = () => {
  const {cartItems} = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
          {cartItems.map(item => <CartItem cartItem={item}/>)}
        </div>
        <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  )}

export default CartDropdown