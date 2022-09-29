import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserOrders } from '../../../actions/product'
function OrderList() {
  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(fetchUserOrders())
  }, [])
  const orders = useSelector(state => state.products)
  console.log(orders)
  return (
    <div>OrderList</div>
  )
}

export default OrderList