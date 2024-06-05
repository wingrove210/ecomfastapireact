import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  updateCartQuantity,
} from '../redux/cart.slice';
import { HiMinus } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
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

                {cartItems.map((item) => {
                  return (
                    <div key={item.id} className='flex justify-between items-center'>
                      <img src={item.image} width="100" height="100" alt={item.name}/>
                      <div className='text-left'>
                        <h1 className='font-bold text-2xl'> {item.name} </h1>
                        <p> ID: {item.id} </p>
                        <p>СТРАНА :{item.type}</p>
                        <p>Сорт :{item.sort}</p>
                        <p>Сезон цветения :{item.season}</p>
                      </div>
                      <div className='flex justify-center items-center gap-2 pl-[10vw]'>
                        <button
                        className='border-[1px] border-stone-500 rounded-full px-1 py-1'
                          onClick={() => {
                            const newQuantity = item.quantity - 1;
                            if (newQuantity >= 0) {
                              dispatch(updateCartQuantity({ id: item.id, quantity: newQuantity }));
                            }
                          }}
                        >
                          <HiMinus/>
                        </button>
                        <p className='font-bold text-stone-600 text-xl'>{item.quantity}</p>
                        <button
                        className='border-[1px] border-stone-500 rounded-full px-1 py-1'
                          onClick={() => {
                            const newQuantity = item.quantity + 1;
                            dispatch(updateCartQuantity({ id: item.id, quantity: newQuantity }));
                          }}
                        >
                          <HiPlus />
                        </button>
                        <div className='flex justify-center items-center gap-[3vh] flex-col pl-[10vw] cursor-pointer'>
                          <div onClick={() => {
                            dispatch(removeFromCart(item));
                          }}><RxCross1 className='w-8 h-8'/></div>
                          <p className='font-thin text-2xl'>{item.quantity * item.price} Р</p>
                        </div>
                      </div>
                        <div/> 
                    </div>
                  );
                })}
          </div>
          <h2 className="text-center uppercase">Итого: {subtotal} Р</h2>
          <Checkout amount={subtotal} />
        </div>
      </div>
    </div>
  );
}
