import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function Shipping(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart
  const { userInfo } = userSignin;
  
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1> Shipping Address</h1>
        </div>
        <div>
          <label htmlFor='fullName'></label>
          <input
            type='text'
            id='fullName'
            placeholder='Enter full name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='address'></label>
          <input
            type='text'
            id='address'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='city'></label>
          <input
            type='text'
            id='city'
            placeholder='Enter the city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='postalCode'></label>
          <input
            type='text'
            id='postalCode'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='country'></label>
          <input
            type='text'
            id='country'
            placeholder='Enter the country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label></label>
          <button className='primary' type='submit'>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default Shipping;
