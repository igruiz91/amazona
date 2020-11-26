import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product';
import Loading from '../components/Loading';
import Message from '../components/Message';

function Home() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList
  
  useEffect(() => {
    dispatch(listProducts())
  }, [])
  
  if(!products){
    return <div>No products</div>
  }

  return (
    <div>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='row center'>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home
