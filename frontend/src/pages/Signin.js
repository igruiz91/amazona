import React, { useState } from "react";
import { Link } from 'react-router-dom'

function Signin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    //TODO: signin action
  };

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        <div>
          <label htmlFor='email'>Email Address</label>
          <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter Email' required/>
        </div>
        <div>
          <label htmlFor='password'>password Address</label>
          <input type="password" id='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter password' required/>
        </div>
        <div><label></label>
          <button className='primary' type='submit'>Sign In </button>
        </div>
        <div><label></label>
          <div>New customer ? <Link to='/register'>Create your account</Link></div>
        </div>
        
      </form>
    </div>
  );
}

export default Signin;
