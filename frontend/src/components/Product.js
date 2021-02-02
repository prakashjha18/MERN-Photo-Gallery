import React from 'react'
import { Link } from 'react-router-dom'
import { Card} from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <strong>{product.name}</strong>
        </Link>

      </Card.Body>
    </Card>
  )
}

export default Product