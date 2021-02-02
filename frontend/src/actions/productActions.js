import axios from 'axios'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'
import {
  USER_DETAILS_REQUEST
} from '../constants/userConstants'

export const listProducts = () => async (dispatch,getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })
    const { userLogin: { userInfo} } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
    }

    dispatch({ type: PRODUCT_LIST_REQUEST })

    

    const { data } = await axios.get(
      '/api/products',
      config
    )

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch,getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })
    const { userLogin: { userInfo} } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
    }
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(
      `/api/products/${id}`,
      config
    )

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}