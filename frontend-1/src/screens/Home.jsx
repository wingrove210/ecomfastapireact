import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../redux/product.slice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import background_1 from '../assets/Blackgroud img 1.svg';
import background_2 from '../assets/Blackgroud img 2.svg';
// import background_2 from '../assets/background_2.jpg';



// const myStyles = {
//   itemShapes: Star,
//   activeFillColor: '#ffb700',
//   inactiveFillColor: '#fbf1a9',
// };
export default function HomeScreen() {
  const [prod, setProducts] = useState([]);
  // const getallproductstate = useSelector((state) => state.productReducer);
  const loginReducer = useSelector((state) => state.loginReducer);

  // const { accuracy } = getallproductstate;
  const {  currentUser } = loginReducer;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
    axios.get('http://127.0.0.1:8000/api/product').then((e) => {
        setProducts(e.data)
    })
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.jwtToken) {
      navigate("/")
      
    }
  }, [navigate]);

  return (
    <div className='mt-10'>
      <img className='absolute bottom-0 left-0' src={background_1} alt='' />
      <img className='absolute top-[30vh] right-0' src={background_2} alt='' />
      <div className="grid grid-cols-3 gap-4 w-full mt-4 px-[20vw]">
        {
          prod.map((product) => {
            console.log(product.price)
            return(
            <div key={product.id} className={"w-[20vw] m-2" + product.id}>
              <div className="shadow p-3 bg-white rounded">
              <div className="text-left">
                    <div>
                      <Link to={`product/${product.id}`}>
                        <div className="text-center">
                          <img
                            src={product.image}
                            className="img-fluid w-60 h-60 mx-auto"
                            alt={product.name}
                          />
                        </div>
                        <h1 className="text-xl font-semibold">{product.name}</h1>
                        <h1 className="text-lg font-semibold">{product.price} P</h1>
                        <h1>ID: {product.id}</h1>
                        <h1>ВИД: {product.type}</h1>
                        <h1>СОРТ: {product.sort}</h1>
                        <h1>СЕЗОН ЦВЕТЕНИЯ: {product.season}</h1>
                        <button className='bg-[#9E1B3B] px-7 py-2 rounded-3xl text-white mt-5'>Купить</button>
                        {/* <Rating
                          value={product.rating}
                          readOnly={true}
                          itemStyles={myStyles}
                          style={{ maxWidth: 250 }}
                        /> */}
                      </Link>
                    </div>
                  </div>
              </div>
            </div>
          )})
        }
      </div>
    </div>
  );
}
