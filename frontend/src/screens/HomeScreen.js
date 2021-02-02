import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Button, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts,createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET,PRODUCT_DETAILS_RESET } from '../constants/productConstants'

const HomeScreen = ({history}) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

    const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (successCreate) {
      history.push(`/productt/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [history,dispatch,successCreate,createdProduct])
  const createProductHandler = () => {
    dispatch(createProduct())
  }
  return (
    <>
      {userInfo ? (
        <>
        
          <h1>Latest Products</h1>
          {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </>
      ) : (
        <h1>Please Login</h1>
      )}
    </>
  )
}

export default HomeScreen
