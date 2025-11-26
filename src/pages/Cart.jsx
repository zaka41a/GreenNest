import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectCartItems,
  selectTotalQty,
  selectTotalPrice,
  increment,
  decrement,
  removeItem,
  clear
} from '../features/cart/cartSlice'

export default function Cart() {
  const items = useSelector(selectCartItems)
  const totalQty = useSelector(selectTotalQty)
  const totalCost = useSelector(selectTotalPrice)
  const dispatch = useDispatch()

  return (
    <div className="container">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p className="subtle">
          Your cart is empty. <Link to="/products">Continue shopping</Link>.
        </p>
      ) : (
        <>
          {items.map(({ id, name, image, price, qty }) => (
            <div key={id} className="lineItem">
              <img src={image} alt={name} width={72} height={72} style={{borderRadius:8, objectFit:'cover'}}/>
              <div>
                <strong>{name}</strong>
                <div className="subtle">Unit: ${price.toFixed(2)}</div>
              </div>
              <div className="qControls">
                <button className="qBtn" onClick={() => dispatch(decrement(id))}>−</button>
                <span className="qty">{qty}</span>
                <button className="qBtn" onClick={() => dispatch(increment(id))}>＋</button>
              </div>
              <div><strong>${(qty * price).toFixed(2)}</strong></div>
              <button className="btn outline" onClick={() => dispatch(removeItem(id))}>Remove</button>
            </div>
          ))}

          <div className="totalBar">
            <div><strong>Total items:</strong> {totalQty}</div>
            <div><strong>Total cost:</strong> ${totalCost.toFixed(2)}</div>
          </div>

          <div style={{display:'flex', gap:12, marginTop:16}}>
            <Link to="/products" className="btn outline">Continue Shopping</Link>
            <Link to="/checkout" className="btn primary">Proceed to Checkout</Link>
            <button className="btn outline" onClick={() => dispatch(clear())}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  )
}
