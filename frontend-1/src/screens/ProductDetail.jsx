import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../redux/cart.slice';
import Loader from '../components/Loader';
import Error from '../components/Error';
import background_1 from '../assets/Blackgroud img 1.svg';
import background_2 from '../assets/Blackgroud img 2.svg';
import { HiMinus } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
// import Review from '../components/Review';

import { getProductById } from '../redux/product.slice';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [cartError, setCartError] = useState('');
  const productState = useSelector((state) => state.productReducer);
  const { product, loading, error } = productState;
  const [quantity, setQuantity] = useState(1);

  const addCart = () => {
    const parsedQuantity = parseInt(quantity);
    if (
      isNaN(parsedQuantity) ||
      parsedQuantity <= 0 ||
      parsedQuantity > product?.countInStock
    ) {
      setCartError('Invalid quantity');
      return;
    }
    console.log(product, parsedQuantity);
    dispatch(addItemToCart({ product, quantity: parsedQuantity }));
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }
  // const [quantity, setQuantity] = useState(1);

const handleIncrement = () => {
  if (quantity < product.countInStock) {
    setQuantity(quantity + 1);
  }
};

const handleDecrement = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};
  return (
    <div className="max-w-[70vw] ml-[5vw] mt-10">
            <img className='absolute bottom-0 left-0' src={background_1} alt='' />
      <img className='absolute top-[30vh] right-0' src={background_2} alt='' />
      {product && (
        <>
          <div className="flex justify-start items-center">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:pl-8 mt-4 md:mt-0">
                <h1 className="text-xl xl:text-2xl font-bold mb-1">
                  {product.name}
                </h1>

                <div className="m-2">
                  <h1 className='mt-3 mb-3 text-2xl font-medium'>{product.price} P</h1>
                  <h1 className='font-next'>ID: {product.id}</h1>
                  <h1 className='font-next'>СТРАНА: {product.type}</h1>
                  <h1 className='font-next'>СОРТ: {product.sort}</h1>
                  <h1 className='font-next'>СЕЗОН ЦВЕТЕНИЯ: {product.season}</h1>
                  <p className='mt-3 font-next'>{product.description}</p>
                  <div className='flex justify-center items-center gap-2 mt-3 mr-[10vw]'>
                    <button className='border-[1px] border-stone-500 rounded-full px-1 py-1' onClick={handleDecrement}><HiMinus /></button>
                    <div className='font-bold text-stone-600 text-xl'>{quantity}</div>
                    <button className='border-[1px] border-stone-500 rounded-full px-1 py-1' onClick={handleIncrement}><HiPlus /></button>
                  </div>
                  {product.countInStock > 0 ? (
                    <button
                      className="bg-[#9E1B3B] mt-5 text-white py-2 px-4 rounded-3xl cursor-pointer"
                      onClick={addCart}
                    >
                      ДОБАВИТЬ В КОРЗИНУ
                    </button>
                  ) : (
                    <div>
                      <h1>Закончилось</h1>
                      <button
                        className="bg-gray-300 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
                        disabled
                      >
                        Добавить в корзину
                      </button>
                    </div>
                  )}
                </div>
                {/* <Review product={product} /> */}
              </div>
            </div>
            <div className="w-[55vw]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[30vw]"
                />
              </div>
          </div>
        </>
      )}
      {cartError && <Error error={cartError} />}
    </div>
  );
}
