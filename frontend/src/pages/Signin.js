import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signin} from '../actions/userActions'
import Loading from "../components/Loading";
import Message from "../components/Message";

function Signin(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo, loading, error } = userSignin;
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/' 
  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if(userInfo) props.history.push(redirect)
  }, [props.history, redirect, userInfo])

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <Loading></Loading>}
        {error && <Message variant='danger'>{error}</Message>}
        <div>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            required
          />
        </div>
        <div>
          <label htmlFor='password'>password Address</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
            required
          />
        </div>
        <div>
          <label></label>
          <button className='primary' type='submit'>
            Sign In{" "}
          </button>
        </div>
        <div>
          <label></label>
          <div>
            New customer ? <Link to='/register'>Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signin;
