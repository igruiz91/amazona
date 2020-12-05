import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import Message from "../components/Message";
import Loading from "../components/Loading";

function Profile() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userSignin;
  const { loading, error, user } = userDetails;

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
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
            <div>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                placeholder='Enter name'
                value={user.name}
              />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                id='email'
                placeholder='Enter email'
                value={user.email}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Enter password'
              />
            </div>
            <div>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                id='confirmPassword'
                placeholder='Confirm Password'
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
