import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../redux/product.slice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Rating, Star} from '@smastrom/react-rating';

const myStyles = {
  itemShapes: Star,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9',
};
export default function HomeScreen() {
  const [prod, setProducts] = useState([]);
  const getallproductstate = useSelector((state) => state.productReducer);
  const loginReducer = useSelector((state) => state.loginReducer);

  const { accuracy } = getallproductstate;
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
      <h1 className="text-center text-2xl font-bold mt-4">
        Recommendation Products based berdasarkan Rating dan Price
      </h1>
      <p className="text-center text-xl font-semibold">
        Accuracy: {accuracy}
      </p>

      <div className="flex flex-wrap justify-center mt-4 mx-2">
        {
          prod.map((product) => {
            console.log(product.price)
            return(
            <div key={product.id} className={"w-full md:w-1/4 m-2" + product.id}>
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

                        <Rating
                          value={product.rating}
                          readOnly={true}
                          itemStyles={myStyles}
                          style={{ maxWidth: 250 }}
                        />

                        <h1 className="text-lg font-semibold">Price: {product.price}</h1>
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
