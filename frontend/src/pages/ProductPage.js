import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Rating from "../components/Rating";

function ProductPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProducts(productId));
  }, [dispatch, productId]);

  return (
    <div>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Link to='/'>Back to result</Link>
          <div className='row top'>
            <div className='col-2'>
              <img src={product.image} alt={product.name} />
            </div>
            <div className='col-1'>
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>Price: ${product.price}</li>
                <li>
                  Description: <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className='col-1'>
              <div className='card card-body'>
                <ul>
                  <li>
                    <div className='row'>
                      <div>price</div>
                      <div className='price'>${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className='row'>
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className='success'>In Stock</span>
                        ) : (
                          <span className='danger'>Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <button className='primary block'>Add to Cart</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
