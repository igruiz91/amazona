import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import axios from 'axios'
import Loading from '../components/Loading';
import Message from '../components/Message';

function Home() {
  const url = "/api/products";
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getProducts = async() => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      if (data) setProducts(data);
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }
  
  useEffect(() => {
    getProducts()
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
