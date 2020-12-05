import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { USER_UPDATE_PROFILE_RESET } from "../constants/usersConstants";

function Profile() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const userDetails = useSelector((state) => state.userDetails);
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { userInfo } = userSignin;
  const { loading, error, user } = userDetails;
  const {error: errorUpdate, success: successUpdate, loading: loadingUpdate} = userUpdateProfile;

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if(!user){
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(detailsUser(userInfo._id));
    }else{
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert('Passwords not match')
    }else{
      dispatch(updateUserProfile({userId: user.id , name, email, password}))
    }
  };

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
          {loadingUpdate && <Loading />}
        {error && <Message variant='danger'>{error}</Message>}
        {successUpdate && <Message variant='success'>Profile updated Successfully</Message>}
            <div>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                id='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                id='confirmPassword'
                placeholder='Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className='primary' type='submit'>
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default Profile;
