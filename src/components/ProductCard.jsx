import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectHasItem } from '../features/cart/cartSlice'


export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow p-4 flex flex-col items-center w-60">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="mt-2 font-bold">{product.name}</h3>
      <p className="text-gray-700">${product.price}</p>
      <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  )
}
