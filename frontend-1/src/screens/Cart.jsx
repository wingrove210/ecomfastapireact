import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  updateCartQuantity,
} from '../redux/cart.slice';
import Checkout from '../components/Checkout';
// import background_1 from '../assets/Blackgroud img 1.svg';
// import background_2 from '../assets/Blackgroud img 2.svg';

export default function CartScreen() {
  const cartreducerstate = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const { cartItems } = cartreducerstate;

  var subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 card text-center shadow p-3 mb-5 bg-white rounded">
          <div className="w-full text-center m-5 border-b-2 border-stone-500 pb-2">
            <h1 className="text-2xl font-bold">ВАШ ЗАКАЗ :</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr key={item.id}>
                      {' '}
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateCartQuantity({
                                id: item.id,
                                quantity: parseInt(e.target.value),
                              })
                            )
                          }
                        />
                      </td>
                      <td>{item.quantity * item.price}</td>
                      <td>
                        <i
                          style={{ color: 'red' }}
                          className="far fa-trash-alt"
                          onClick={() => {
                            dispatch(removeFromCart(item));
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <hr />
          <h2 className="text-center">SubTotal: {subtotal} Rp/-</h2>
          <hr />
          <Checkout amount={subtotal} />
        </div>
      </div>
    </div>
  );
}
